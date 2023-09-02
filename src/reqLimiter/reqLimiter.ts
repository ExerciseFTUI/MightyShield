import { Request, Response, NextFunction } from 'express';
import requestIp from 'request-ip';

interface RequestCount {
  [key: string]: {
    timestamp: number;
    count: number;
  };
}

function cleanupRequestCount(requestCount: RequestCount, resetTime: number) {
  const currentTime = Date.now();

  for (const clientIP in requestCount) {
    if (currentTime - requestCount[clientIP].timestamp >= resetTime) {
      delete requestCount[clientIP];
    }
  }
}

function getClientIp(req: Request, res: Response): string | null {
  try {
    const clientIp: string | null = requestIp.getClientIp(req);

    // Validate the IP address (IPv4 or IPv6)
    const ipPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$|^[0-9a-fA-F:]+:[0-9a-fA-F]*:[0-9a-fA-F]$/;

    if (clientIp && ipPattern.test(clientIp)) {
      return clientIp;
    } else {
      res.status(400).send('Invalid client IP address');
      return null;
    }
  } catch (error) {
    console.error('Error in getClientIp:', error);
    res.status(500).send('Internal Server Error');
    return null;
  }
}

export default function requestLimiter(maxRequests: number = 100, resetTime: number = 300000, cleanupInterval: number = 30000) {
  const requestCount: RequestCount = {};

  setInterval(() => {
    try {
      cleanupRequestCount(requestCount, resetTime);
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }, cleanupInterval);

  return function (req: Request, res: Response, next: NextFunction) {
    const clientIP = getClientIp(req, res);
    const currentTime = Date.now();

    try {
      if (!requestCount[clientIP]) {
        requestCount[clientIP] = {
          timestamp: currentTime,
          count: 1,
        };
      } else {
        // Check if the reset time has passed, and if so, reset the count and timestamp
        if (currentTime - requestCount[clientIP].timestamp >= resetTime) {
          requestCount[clientIP] = {
            timestamp: currentTime,
            count: 1,
          };
        } else {
          requestCount[clientIP].count++;
        }
      }

      if (requestCount[clientIP].count <= maxRequests) {
        next();
      } else {
        res.status(429).send('Too many requests (Max requests reached)');
      }
    } catch (error) {
      console.error('Error in requestLimiter middleware:', error);
      res.status(500).send('Internal Server Error');
    }
  };
}

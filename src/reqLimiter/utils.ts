import { Request, Response } from 'express';
import requestIp from 'request-ip';

interface RequestCount {
  [key: string]: {      //the IP address
    timestamp: number;  //When the ip starts to send request
    count: number;      //The amount of request sent
  };
}

export function cleanupRequestCount(requestCount: RequestCount, resetTime: number, cleanupInterval: number) {

    //set an interval to check requestCount
    setInterval(() => {
        try {
            const currentTime = Date.now();

            //Goes to every ip in requestCount then deletes it if its already pass the resetTime
            for (const clientIP in requestCount) {
                if (currentTime - requestCount[clientIP].timestamp >= resetTime) {
                    delete requestCount[clientIP];
                }
            }

        } catch (error) {
          console.error('Error during cleanup:', error);
        }
    }, cleanupInterval);
}


export function getClientIp(req: Request, res: Response): string | null {
    try {
        const clientIp: string | undefined = requestIp.getClientIp(req);

        // Checks if the IP is found or not
        if (!clientIp) {
            res.status(400).send('Client IP address not found in the request');
            return null;
        }

        // Validate the IP address (IPv4 or IPv6)
        const ipPattern = /^(?:\d{1,3}\.){3}\d{1,3}$|^[0-9a-fA-F:]+:[0-9a-fA-F:]*:[0-9a-fA-F:]*$/;
        if (!ipPattern.test(clientIp)) {
            res.status(400).send('Invalid client IP address');
            return null;
        }

        // If the IP address is valid, return it
        return clientIp;

    } catch (error) {
        console.error('Error in getClientIp:', error);
        res.status(500).send('Internal Server Error');
        return null;
    }
}

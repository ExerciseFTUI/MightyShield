import { Request, Response, NextFunction } from 'express';
import { cleanupRequestCount, getClientIp } from './utils.js';

interface RequestCount {
  [key: string]: {      //the IP address
    timestamp: number;  //When the ip starts to send request
    count: number;      //The amount of request sent
  };
}

export default function requestLimiter({
  maxRequests = 100,            //default value of maxRequest
  resetTime = 300000,           //default value of resetTime in ms (5 mins)
  cleanupInterval = 300000,     //default value of cleanupInterval in ms (5 mins)
  }:{
    maxRequests? : number;      //max amount of time a request could be sent before getting blocked
    resetTime? : number;        //The time to allow reset of count on a certain ip
    cleanupInterval? : number;  //The interval to cleanup no longger used data on requestCount
  }) {
  const requestCount: RequestCount = {};

  //Clean any data that has pass the resetTime for every cleanupInterval
  cleanupRequestCount(requestCount, resetTime, cleanupInterval);

  return function (req: Request, res: Response, next: NextFunction) {
    const clientIP = getClientIp(req, res); 
    const currentTime = Date.now();         

    try {
      //if clientIP doesn't exist in requestCount, initiate it
      if (!requestCount[clientIP]) {
        requestCount[clientIP] = {
          timestamp: currentTime,
          count: 1,
        };
      } 
      
      //if clientIP exist in requestCount
      else {
        // Check if the reset time has passed, and if so, reset the count and timestamp
        if (currentTime - requestCount[clientIP].timestamp >= resetTime) {
          requestCount[clientIP] = {
            timestamp: currentTime,
            count: 1,
          };
        } 
        
        //adds the count for an existing clientIP in requestCount
        else {
          requestCount[clientIP].count++;
        }
      }

      //if the count is less than or equal to maxRequest
      if (requestCount[clientIP].count <= maxRequests) {
        next();
      } 
      
      //if the count is more than maxRequest
      else {
        res.status(429).send('Too many requests (Max requests reached)');
      }

    } catch (error) {
      console.error('Error in requestLimiter middleware:', error);
      res.status(500).send('Internal Server Error');
    }
  };
}


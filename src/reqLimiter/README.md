## Overview

The `requestLimiter` is an Express middleware designed to limit the number of requests that can be made from a specific IP address within a specified time window. This middleware helps protect your server from abuse or overloading by restricting the rate of incoming requests from individual clients.

## How it works

1. When a request is received, the middleware checks the client's IP address and tracks the number of requests made from that IP.

2. If the IP address is not found in the tracking data, it is initialized with a request count of 1 and a timestamp.

3. If the IP address is already tracked, the middleware checks if the time elapsed since the last request exceeds the `resetTime`. If it does, the request count is reset to 1; otherwise, the count is incremented.

4. If the request count for an IP address exceeds `maxRequests`, the middleware responds with a `429 Too Many Requests` status and an error message.

5. If an error occurs during the process, such as a database error or internal issue, the middleware responds with a `500 Internal Server Error`.

## Example

```javascript
import express from 'express';
import requestLimiter from './requestLimiter.js';

const app = express();

app.use(requestLimiter({
  maxRequests: 100,
  resetTime: 300000,		//5 mins in ms
  cleanupInterval: 600000,	//10 mins in ms
}));

// Define your routes and other middleware here.

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

In this example, the `requestLimiter` middleware is used to limit incoming requests to a maximum of 100 requests per IP address within a 5-minute window, and in every 10-minutes the program will cleanup the counter of an IP if its no longer useful. Requests beyond 100 limit will receive a `429 Too Many Requests` response.

## Methods
-export function cleanupRequestCount(requestCount: RequestCount, resetTime: number, cleanupInterval: number) : Delete any data from requestCount that has pass the resetTime
-export function getClientIp(req: Request, res: Response): Validates and returns the IP address

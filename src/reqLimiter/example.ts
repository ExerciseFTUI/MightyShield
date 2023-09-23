import express from 'express';
import requestLimiter from './reqLimiter.js';

const app = express();
const port = 3000;

app.use('/login', requestLimiter({resetTime: 60000, maxRequests: 10, cleanupInterval: 60000})); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/login', (request, response) => {
  response.send('Access granted');
});

app.post('/login', (request, response) => {
  response.send('Access granted');
});

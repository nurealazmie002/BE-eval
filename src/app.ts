import express, { Application, Request, Response } from 'express';
import routes from './routes'; 

import { requestTimerMiddleware } from './middlewares/requestTimer';
import { requestIdMiddleware } from './middlewares/requestId';
import { errorHandler } from './middlewares/errorHandler';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestIdMiddleware);
app.use(requestTimerMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Selamat datang di Perpustakaan API - Final Minggu 1',
    version: '1.0.0',
    endpoints: {
      books: '/api/books',
      members: '/api/members',
    },
  });
});

app.use('/api', routes);  


export default app;
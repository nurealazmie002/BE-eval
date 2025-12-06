import { Request, Response, NextFunction } from 'express';

export const requestTimerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.path} - ${duration}ms - Status: ${res.statusCode}`
    );
  });

  next();
};
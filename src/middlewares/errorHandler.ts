import { Request, Response, NextFunction } from 'express';
import { Prisma } from '../generated/client'; 

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
    statusCode = 404;
    message = 'Data yang diminta tidak ditemukan.';
  } else if (err.code === 'P2025') { 
    statusCode = 404;
    message = 'Data tidak ditemukan.';
  }

  if (err.code === 'P2002') {
    statusCode = 400;
    const target = (err.meta?.target as string[])?.join(', ') || 'field';
    message = `Nilai untuk ${target} sudah terdaftar. Mohon gunakan nilai yang unik.`;
  }
  
  if (err.statusCode && err.message) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};
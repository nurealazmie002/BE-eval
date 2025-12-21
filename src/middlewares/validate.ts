import { Request, Response, NextFunction } from 'express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { validationResult } = require('express-validator'); 

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validasi input gagal',
      errors: errors.array().map((err: any) => ({
        field: err.path || err.param, 
        message: err.msg
      }))
    });
  }
  
  next();
};
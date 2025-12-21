import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { body } = require('express-validator');

export const registerValidation = [
  body('name')
    .notEmpty().withMessage('Nama wajib diisi')
    .isString().withMessage('Nama harus berupa text')
    .isLength({ min: 2 }).withMessage('Nama minimal 2 karakter'),
  
  body('email')
    .notEmpty().withMessage('Email wajib diisi')
    .isEmail().withMessage('Format email tidak valid'),
  
  body('password')
    .notEmpty().withMessage('Password wajib diisi')
    .isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
  
  body('phone')
    .optional()
    .isString().withMessage('Telepon harus berupa text'),
  
  body('address')
    .optional()
    .isString().withMessage('Alamat harus berupa text'),
  
  body('role')
    .optional()
    .isIn(['MEMBER', 'ADMIN']).withMessage('Role harus MEMBER atau ADMIN'),
];

export const loginValidation = [
  body('email')
    .notEmpty().withMessage('Email wajib diisi')
    .isEmail().withMessage('Format email tidak valid'),
  
  body('password')
    .notEmpty().withMessage('Password wajib diisi'),
];

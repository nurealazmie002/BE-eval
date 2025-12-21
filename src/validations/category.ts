import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { body, param } = require('express-validator'); 

export const createCategoryValidation = [
  body('name')
    .notEmpty().withMessage('Nama kategori wajib diisi')
    .isString().withMessage('Nama harus berupa text')
    .isLength({ min: 3 }).withMessage('Nama minimal 3 karakter'),
];

export const updateCategoryValidation = [
  param('id').isUUID().withMessage('ID harus UUID'),
  body('name')
    .optional().isString().withMessage('Nama harus berupa text')
    .isLength({ min: 3 }).withMessage('Nama minimal 3 karakter'),
  body('description')
    .optional().isString().withMessage('Deskripsi harus berupa text'),
];
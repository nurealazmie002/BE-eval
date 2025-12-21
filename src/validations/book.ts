import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { body, param, query } = require('express-validator'); 

export const createBookValidation = [
  body('judul')
    .notEmpty().withMessage('Judul buku wajib diisi')
    .isString().withMessage('Judul harus berupa text')
    .isLength({ min: 3 }).withMessage('Judul minimal 3 karakter'),
  
  body('penulis')
    .notEmpty().withMessage('Penulis wajib diisi')
    .isString().withMessage('Penulis harus berupa text'),
  
  body('penerbit')
    .notEmpty().withMessage('Penerbit wajib diisi')
    .isString().withMessage('Penerbit harus berupa text'),
  
  body('tahun_terbit')
    .notEmpty().withMessage('Tahun terbit wajib diisi')
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage(`Tahun terbit harus valid`),
  
  body('categoryId')
    .notEmpty().withMessage('Category ID wajib diisi')
    .isUUID().withMessage('Category ID harus berupa valid UUID'),

  body('stok')
    .notEmpty().withMessage('Stok wajib diisi')
    .isInt({ min: 0 }).withMessage('Stok harus angka >= 0'),
];

export const updateBookValidation = [
  param('id')
    .isUUID().withMessage('ID buku harus valid UUID'),
    
  body('judul')
    .optional().isString().withMessage('Judul harus berupa text')
    .isLength({ min: 3 }).withMessage('Judul minimal 3 karakter'),
    
  body('penulis').optional().isString().withMessage('Penulis harus berupa text'),
  body('penerbit').optional().isString().withMessage('Penerbit harus berupa text'),
  
  body('tahun_terbit')
    .optional().isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage(`Tahun terbit harus valid`),
    
  body('categoryId')
    .optional().isUUID().withMessage('Category ID harus berupa valid UUID'),
    
  body('stok')
    .optional().isInt({ min: 0 }).withMessage('Stok harus angka >= 0'),
];

export const searchBookValidation = [
  query('search').optional().isString().withMessage('Search harus berupa text'),
  query('kategori').optional().isString().withMessage('Filter kategori harus berupa text'),
  query('min_tahun').optional().isInt().withMessage('Min tahun harus angka valid'),
  query('max_tahun').optional().isInt().withMessage('Max tahun harus angka valid'),
];
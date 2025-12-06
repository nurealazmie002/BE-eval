import { body, param, query } from 'express-validator';

export const createBookValidation = [
  body('judul')
    .notEmpty()
    .withMessage('Judul buku wajib diisi')
    .isString()
    .withMessage('Judul harus berupa text')
    .isLength({ min: 3 })
    .withMessage('Judul minimal 3 karakter'),
  body('penulis')
    .notEmpty()
    .withMessage('Penulis wajib diisi')
    .isString()
    .withMessage('Penulis harus berupa text'),
  body('penerbit')
    .notEmpty()
    .withMessage('Penerbit wajib diisi')
    .isString()
    .withMessage('Penerbit harus berupa text'),
  body('tahun_terbit')
    .notEmpty()
    .withMessage('Tahun terbit wajib diisi')
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage(`Tahun terbit harus antara 1000 - ${new Date().getFullYear()}`),
  body('kategori')
    .notEmpty()
    .withMessage('Kategori wajib diisi')
    .isIn(['fiksi', 'non-fiksi', 'referensi', 'komik', 'majalah'])
    .withMessage('Kategori tidak valid'),
  body('stok')
    .notEmpty()
    .withMessage('Stok wajib diisi')
    .isInt({ min: 0 })
    .withMessage('Stok harus lebih dari atau sama dengan 0'),
];

export const updateBookValidation = [
  param('id').notEmpty().withMessage('ID buku wajib diisi'),
  body('judul')
    .optional()
    .isString()
    .withMessage('Judul harus berupa text')
    .isLength({ min: 3 })
    .withMessage('Judul minimal 3 karakter'),
  body('penulis').optional().isString().withMessage('Penulis harus berupa text'),
  body('penerbit').optional().isString().withMessage('Penerbit harus berupa text'),
  body('tahun_terbit')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage(`Tahun terbit harus antara 1000 - ${new Date().getFullYear()}`),
  body('kategori')
    .optional()
    .isIn(['fiksi', 'non-fiksi', 'referensi', 'komik', 'majalah'])
    .withMessage('Kategori tidak valid'),
  body('stok')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stok harus lebih dari atau sama dengan 0'),
];

export const getBookByIdValidation = [
  param('id').notEmpty().withMessage('ID buku wajib diisi'),
];

export const searchBookValidation = [
  query('search').optional().isString().withMessage('Search harus berupa text'),
  query('kategori')
    .optional()
    .isIn(['fiksi', 'non-fiksi', 'referensi', 'komik', 'majalah'])
    .withMessage('Kategori tidak valid'),
  query('min_tahun')
    .optional()
    .isInt({ min: 1000 })
    .withMessage('Min tahun harus angka valid'),
  query('max_tahun')
    .optional()
    .isInt({ min: 1000 })
    .withMessage('Max tahun harus angka valid'),
];
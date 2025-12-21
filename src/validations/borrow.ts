import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { body, param, query } = require('express-validator');

export const borrowBooksValidation = [
  body('memberId')
    .notEmpty().withMessage('Member ID wajib diisi')
    .isUUID().withMessage('Member ID harus berupa valid UUID'),
  
  body('dueDate')
    .notEmpty().withMessage('Tanggal jatuh tempo wajib diisi')
    .isISO8601().withMessage('Format tanggal harus valid (YYYY-MM-DD)')
    .custom((value: string) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Tanggal jatuh tempo harus setelah hari ini');
      }
      return true;
    }),
  
  body('items')
    .isArray({ min: 1 }).withMessage('Minimal 1 buku harus dipinjam'),
  
  body('items.*.bookId')
    .notEmpty().withMessage('Book ID wajib diisi')
    .isUUID().withMessage('Book ID harus berupa valid UUID'),
  
  body('items.*.quantity')
    .optional()
    .isInt({ min: 1 }).withMessage('Quantity harus minimal 1'),
];

export const borrowIdValidation = [
  param('id')
    .isUUID().withMessage('ID peminjaman harus valid UUID'),
];

export const searchBorrowValidation = [
  query('memberId').optional().isUUID().withMessage('Member ID harus valid UUID'),
  query('status').optional().isIn(['BORROWED', 'RETURNED', 'OVERDUE']).withMessage('Status harus BORROWED, RETURNED, atau OVERDUE'),
];

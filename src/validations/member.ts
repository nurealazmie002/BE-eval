const { body, param, query } = require('express-validator'); 

export const createMemberValidation = [
  body('nama')
    .notEmpty().withMessage('Nama wajib diisi')
    .isString().withMessage('Nama harus berupa text')
    .isLength({ min: 3 }).withMessage('Nama minimal 3 karakter'),
    
  body('email')
    .notEmpty().withMessage('Email wajib diisi')
    .isEmail().withMessage('Format email salah'),
    
  body('telepon')
    .notEmpty().withMessage('Telepon wajib diisi')
    .matches(/^08\d{8,13}$/).withMessage('Format telepon tidak valid (harus diawali 08)'),
    
  body('alamat')
    .notEmpty().withMessage('Alamat wajib diisi')
    .isString().withMessage('Alamat harus berupa text')
    .isLength({ min: 5 }).withMessage('Alamat minimal 5 karakter'),
];

export const updateMemberValidation = [
  param('id').isUUID().withMessage('ID harus UUID'),
  
  body('nama')
    .optional().isString().withMessage('Nama harus berupa text')
    .isLength({ min: 3 }).withMessage('Nama minimal 3 karakter'),
    
  body('email').optional().isEmail().withMessage('Format email tidak valid'),
  
  body('telepon')
    .optional().matches(/^08\d{8,13}$/).withMessage('Format telepon tidak valid'),
    
  body('alamat')
    .optional().isString().withMessage('Alamat harus berupa text')
    .isLength({ min: 5 }).withMessage('Alamat minimal 5 karakter'),
    
  body('status')
    .optional().isIn(['active', 'inactive']).withMessage('Status harus active atau inactive'),
];

export const searchMemberValidation = [
  query('search').optional().isString().withMessage('Search harus berupa text'),
  query('status').optional().isIn(['active', 'inactive']).withMessage('Status harus active atau inactive'),
];
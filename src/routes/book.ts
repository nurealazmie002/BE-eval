import { Router } from 'express';
import { BookController } from '../controllers/book';
import {
  createBookValidation,
  updateBookValidation,
  getBookByIdValidation,
  searchBookValidation,
} from '../validations/book';
import { validate } from '../middlewares/validate';
import { asyncHandler } from '../utils/async.handler';

const router = Router();
const bookController = new BookController();

router.get(
  '/',
  searchBookValidation,
  validate,
  asyncHandler(bookController.getAllBooks.bind(bookController))
);

router.get(
  '/:id',
  getBookByIdValidation,
  validate,
  asyncHandler(bookController.getBookById.bind(bookController))
);

router.post(
  '/',
  createBookValidation,
  validate,
  asyncHandler(bookController.createBook.bind(bookController))
);

router.put(
  '/:id',
  updateBookValidation,
  validate,
  asyncHandler(bookController.updateBook.bind(bookController))
);

router.delete(
  '/:id',
  getBookByIdValidation,
  validate,
  asyncHandler(bookController.deleteBook.bind(bookController))
);

export default router;
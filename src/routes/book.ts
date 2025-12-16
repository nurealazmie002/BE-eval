import { Router } from 'express';
import { BookController } from '../controllers/book';
import { asyncHandler } from '../utils/async.handler'; 

const router = Router();
const bookController = new BookController();

router.get('/', asyncHandler(bookController.getAllBooks));
router.get('/:id', asyncHandler(bookController.getBookById));
router.post('/', asyncHandler(bookController.createBook));
router.put('/:id', asyncHandler(bookController.updateBook));
router.delete('/:id', asyncHandler(bookController.deleteBook));

export default router;
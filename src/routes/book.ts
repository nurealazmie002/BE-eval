import { Router } from 'express';
import { BookController } from '../controllers/book';
import { asyncHandler } from '../utils/async.handler'; 
import { authenticate, adminOnly } from '../middlewares/auth';
import { uploadCover } from '../middlewares/upload';

const router = Router();
const bookController = new BookController();

router.get('/', authenticate, asyncHandler(bookController.getAllBooks));
router.get('/:id', authenticate, asyncHandler(bookController.getBookById));
router.post('/', authenticate, adminOnly, uploadCover.single('cover'), asyncHandler(bookController.createBook));
router.put('/:id', authenticate, adminOnly, uploadCover.single('cover'), asyncHandler(bookController.updateBook));
router.delete('/:id', authenticate, adminOnly, asyncHandler(bookController.deleteBook));

export default router;
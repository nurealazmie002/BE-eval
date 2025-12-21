import { Router } from 'express';
import { CategoryController } from '../controllers/category';
import { asyncHandler } from '../utils/async.handler';
import { authenticate, adminOnly } from '../middlewares/auth';

const router = Router();
const categoryController = new CategoryController();

router.get('/', authenticate, asyncHandler(categoryController.getAll));
router.get('/:id', authenticate, asyncHandler(categoryController.getById));
router.post('/', authenticate, adminOnly, asyncHandler(categoryController.create));
router.put('/:id', authenticate, adminOnly, asyncHandler(categoryController.update));
router.delete('/:id', authenticate, adminOnly, asyncHandler(categoryController.delete));

export default router;
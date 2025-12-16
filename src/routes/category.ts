import { Router } from 'express';
import { CategoryController } from '../controllers/category';
import { asyncHandler } from '../utils/async.handler';

const router = Router();
const categoryController = new CategoryController();

router.get('/', asyncHandler(categoryController.getAll));
router.get('/:id', asyncHandler(categoryController.getById));
router.post('/', asyncHandler(categoryController.create));
router.put('/:id', asyncHandler(categoryController.update));
router.delete('/:id', asyncHandler(categoryController.delete));

export default router;
import { Router } from 'express';
import bookRoutes from './book';
import memberRoutes from './member';
import categoryRoutes from './category';
import borrowRoutes from './borrow';
import authRoutes from './auth';

const router = Router();

router.use('/auth', authRoutes);
router.use('/books', bookRoutes);
router.use('/members', memberRoutes);
router.use('/categories', categoryRoutes); 
router.use('/borrows', borrowRoutes);

export default router;
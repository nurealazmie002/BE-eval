import { Router } from 'express';
import bookRoutes from './book';
import memberRoutes from './member';
import categoryRoutes from './category';
import borrowRoutes from './borrow';
import authRoutes from './auth';
import statsRoutes from './stats';

const router = Router();

router.use('/auth', authRoutes);
router.use('/books', bookRoutes);
router.use('/members', memberRoutes);
router.use('/categories', categoryRoutes); 
router.use('/borrows', borrowRoutes);
router.use('/admin', statsRoutes);

export default router;
import { Router } from 'express';
import bookRoutes from './book.js';
import memberRoutes from './member.js';
import categoryRoutes from './category.js';
import borrowRoutes from './borrow.js';
import authRoutes from './auth.js';
import statsRoutes from './stats.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/books', bookRoutes);
router.use('/members', memberRoutes);
router.use('/categories', categoryRoutes); 
router.use('/borrows', borrowRoutes);
router.use('/admin', statsRoutes);

export default router;
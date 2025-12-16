import { Router } from 'express';
import bookRoutes from './book';
import memberRoutes from './member';
import categoryRoutes from './category';

const router = Router();

router.use('/books', bookRoutes);
router.use('/members', memberRoutes);
router.use('/categories', categoryRoutes); 

export default router;
import { Router } from 'express';
import bookRoutes from './book';
import memberRoutes from './member';

const router = Router();

router.use('/books', bookRoutes);
router.use('/members', memberRoutes);

export default router;
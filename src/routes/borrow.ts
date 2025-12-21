import { Router } from 'express';
import { BorrowController } from '../controllers/borrow';
import { asyncHandler } from '../utils/async.handler';
import { authenticate, adminOnly } from '../middlewares/auth';

const router = Router();
const borrowController = new BorrowController();

router.get('/my-borrowings', authenticate, asyncHandler(borrowController.getMyBorrowings));
router.get('/', authenticate, adminOnly, asyncHandler(borrowController.getAllBorrowRecords));
router.get('/:id', authenticate, asyncHandler(borrowController.getBorrowRecordById));
router.post('/', authenticate, asyncHandler(borrowController.borrowBooks));
router.put('/:id/return', authenticate, asyncHandler(borrowController.returnBooks));
router.delete('/:id', authenticate, adminOnly, asyncHandler(borrowController.deleteBorrowRecord));

export default router;

import { Router } from 'express';
import { borrowController } from '../controllers/borrow.js';
import { asyncHandler } from '../utils/async.handler.js';
import { authenticate, adminOnly } from '../middlewares/auth.js';

const router = Router();

/**
 * @swagger
 * /borrows/my-borrowings:
 *   get:
 *     summary: Get my borrowings
 *     tags: [Borrowing]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's borrow records
 */
router.get('/my-borrowings', authenticate, asyncHandler(borrowController.getMyBorrowings.bind(borrowController)));

/**
 * @swagger
 * /borrows:
 *   get:
 *     summary: Get all borrow records (Admin only)
 *     tags: [Borrowing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [BORROWED, RETURNED, OVERDUE]
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: memberName
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of borrow records
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/', authenticate, adminOnly, asyncHandler(borrowController.getAllBorrowRecords.bind(borrowController)));

/**
 * @swagger
 * /borrows/{id}:
 *   get:
 *     summary: Get borrow record by ID
 *     tags: [Borrowing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Borrow record details
 *       404:
 *         description: Borrow record not found
 */
router.get('/:id', authenticate, asyncHandler(borrowController.getBorrowRecordById.bind(borrowController)));

/**
 * @swagger
 * /borrows:
 *   post:
 *     summary: Borrow books
 *     tags: [Borrowing]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [dueDate, items]
 *             properties:
 *               dueDate:
 *                 type: string
 *                 format: date
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     bookId:
 *                       type: string
 *                       format: uuid
 *                     quantity:
 *                       type: integer
 *                       default: 1
 *     responses:
 *       201:
 *         description: Books borrowed successfully
 *       400:
 *         description: Validation error or insufficient stock
 */
router.post('/', authenticate, asyncHandler(borrowController.borrowBooks.bind(borrowController)));

/**
 * @swagger
 * /borrows/{id}/return:
 *   put:
 *     summary: Return borrowed books
 *     tags: [Borrowing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Books returned successfully
 *       400:
 *         description: Books already returned
 */
router.put('/:id/return', authenticate, asyncHandler(borrowController.returnBooks.bind(borrowController)));

/**
 * @swagger
 * /borrows/{id}:
 *   delete:
 *     summary: Delete borrow record (Admin only)
 *     tags: [Borrowing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Borrow record deleted successfully
 *       404:
 *         description: Borrow record not found
 */
router.delete('/:id', authenticate, adminOnly, asyncHandler(borrowController.deleteBorrowRecord.bind(borrowController)));

export default router;

import { Router } from 'express';
import { BorrowController } from '../controllers/borrow';
import { asyncHandler } from '../utils/async.handler';
import { authenticate, adminOnly } from '../middlewares/auth';

const router = Router();
const borrowController = new BorrowController();

/**
 * @swagger
 * /borrows/my-borrowings:
 *   get:
 *     summary: Get my borrowings
 *     description: Retrieve all borrow records for the currently authenticated member.
 *     tags: [Borrowing]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's borrow records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     borrowRecords:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/BorrowRecord'
 *                     total:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/my-borrowings', authenticate, asyncHandler(borrowController.getMyBorrowings));

/**
 * @swagger
 * /borrows:
 *   get:
 *     summary: Get all borrow records (Admin only)
 *     description: Retrieve all borrow records with advanced filtering. Requires admin role.
 *     tags: [Borrowing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [BORROWED, RETURNED, OVERDUE]
 *         description: Filter by borrow status
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by borrow date (from)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by borrow date (to)
 *       - in: query
 *         name: memberName
 *         schema:
 *           type: string
 *         description: Search by member name
 *       - in: query
 *         name: memberId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by member ID
 *     responses:
 *       200:
 *         description: List of borrow records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     borrowRecords:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/BorrowRecord'
 *                     total:
 *                       type: integer
 *                     filters:
 *                       type: object
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', authenticate, adminOnly, asyncHandler(borrowController.getAllBorrowRecords));

/**
 * @swagger
 * /borrows/{id}:
 *   get:
 *     summary: Get borrow record by ID
 *     description: Retrieve a single borrow record by its ID.
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
 *         description: Borrow record ID
 *     responses:
 *       200:
 *         description: Borrow record details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/BorrowRecord'
 *       404:
 *         description: Borrow record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', authenticate, asyncHandler(borrowController.getBorrowRecordById));

/**
 * @swagger
 * /borrows:
 *   post:
 *     summary: Borrow books
 *     description: Create a new borrow record for one or more books.
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
 *                 example: "2025-01-15"
 *                 description: Due date for returning books
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [bookId]
 *                   properties:
 *                     bookId:
 *                       type: string
 *                       format: uuid
 *                     quantity:
 *                       type: integer
 *                       default: 1
 *                       minimum: 1
 *     responses:
 *       201:
 *         description: Books borrowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Buku berhasil dipinjam"
 *                 data:
 *                   $ref: '#/components/schemas/BorrowRecord'
 *       400:
 *         description: Validation error or insufficient stock
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Book or member not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', authenticate, asyncHandler(borrowController.borrowBooks));

/**
 * @swagger
 * /borrows/{id}/return:
 *   put:
 *     summary: Return borrowed books
 *     description: Mark a borrow record as returned and restore book stock.
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
 *         description: Borrow record ID
 *     responses:
 *       200:
 *         description: Books returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Buku berhasil dikembalikan"
 *                 data:
 *                   $ref: '#/components/schemas/BorrowRecord'
 *       400:
 *         description: Books already returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Borrow record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id/return', authenticate, asyncHandler(borrowController.returnBooks));

/**
 * @swagger
 * /borrows/{id}:
 *   delete:
 *     summary: Delete borrow record (Admin only)
 *     description: Soft delete a borrow record. Requires admin role.
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
 *         description: Borrow record ID
 *     responses:
 *       200:
 *         description: Borrow record deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Data peminjaman berhasil dihapus"
 *       404:
 *         description: Borrow record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', authenticate, adminOnly, asyncHandler(borrowController.deleteBorrowRecord));

export default router;

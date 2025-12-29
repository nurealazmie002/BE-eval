import { Router } from 'express';
import { statsController } from '../controllers/stats.js';
import { asyncHandler } from '../utils/async.handler.js';
import { authenticate, adminOnly } from '../middlewares/auth.js';

const router = Router();

/**
 * @swagger
 * /admin/stats:
 *   get:
 *     summary: Get admin statistics (Admin only)
 *     description: Retrieve library statistics including total books, active borrowings, and most popular book.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/AdminStats'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/stats', authenticate, adminOnly, asyncHandler(statsController.getAdminStats.bind(statsController)));

export default router;

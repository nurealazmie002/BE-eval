import { Router } from 'express';
import { StatsController } from '../controllers/stats';
import { asyncHandler } from '../utils/async.handler';
import { authenticate, adminOnly } from '../middlewares/auth';

const router = Router();
const statsController = new StatsController();

/**
 * @swagger
 * /admin/stats:
 *   get:
 *     summary: Get admin statistics (Admin only)
 *     description: Retrieve library statistics including total books, active borrowings, and most popular book. Requires admin role.
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
 *                 message:
 *                   type: string
 *                   example: "Admin statistics retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/AdminStats'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/stats', authenticate, adminOnly, asyncHandler(statsController.getAdminStats));

export default router;

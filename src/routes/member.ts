import { Router } from 'express';
import { memberController } from '../controllers/member.js';
import { asyncHandler } from '../utils/async.handler.js'; 
import { authenticate, adminOnly } from '../middlewares/auth.js';

const router = Router();

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members (Admin only)
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [ACTIVE, INACTIVE]
 *     responses:
 *       200:
 *         description: List of members
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/', authenticate, adminOnly, asyncHandler(memberController.getAllMembers.bind(memberController)));

/**
 * @swagger
 * /members/{id}:
 *   get:
 *     summary: Get member by ID (Admin only)
 *     tags: [Members]
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
 *         description: Member details
 *       404:
 *         description: Member not found
 */
router.get('/:id', authenticate, adminOnly, asyncHandler(memberController.getMemberById.bind(memberController)));

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Create a new member (Admin only)
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Member created successfully
 *       400:
 *         description: Validation error or email already exists
 */
router.post('/', authenticate, adminOnly, asyncHandler(memberController.createMember.bind(memberController)));

/**
 * @swagger
 * /members/{id}:
 *   put:
 *     summary: Update a member (Admin only)
 *     tags: [Members]
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
 *         description: Member updated successfully
 *       404:
 *         description: Member not found
 */
router.put('/:id', authenticate, adminOnly, asyncHandler(memberController.updateMember.bind(memberController)));

/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     summary: Delete a member (Admin only)
 *     tags: [Members]
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
 *         description: Member deleted successfully
 *       404:
 *         description: Member not found
 */
router.delete('/:id', authenticate, adminOnly, asyncHandler(memberController.deleteMember.bind(memberController)));

export default router;
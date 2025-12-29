import { Router } from 'express';
import { authController } from '../controllers/auth.js';
import { asyncHandler } from '../utils/async.handler.js';
import { validate } from '../middlewares/validate.js';
import { registerValidation, loginValidation } from '../validations/auth.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new member
 *     description: Create a new user account. Default role is MEMBER.
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "password123"
 *               phone:
 *                 type: string
 *                 example: "08123456789"
 *               address:
 *                 type: string
 *                 example: "Jl. Example No. 123"
 *               role:
 *                 type: string
 *                 enum: [MEMBER, ADMIN]
 *                 default: MEMBER
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Validation error or email already exists
 */
router.post('/register', registerValidation, validate, asyncHandler(authController.register.bind(authController)));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to get JWT token
 *     description: Authenticate user and receive a JWT token for API access.
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "admin@perpustakaan.com"
 *               password:
 *                 type: string
 *                 example: "admin123"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginValidation, validate, asyncHandler(authController.login.bind(authController)));

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get current user profile
 *     description: Retrieve the profile of the currently authenticated user.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/profile', authenticate, asyncHandler(authController.getProfile.bind(authController)));

export default router;

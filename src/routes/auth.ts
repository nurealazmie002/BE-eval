import { Router } from 'express';
import { AuthController } from '../controllers/auth';
import { asyncHandler } from '../utils/async.handler';
import { validate } from '../middlewares/validate';
import { registerValidation, loginValidation } from '../validations/auth';
import { authenticate } from '../middlewares/auth';

const router = Router();
const authController = new AuthController();

router.post('/register', registerValidation, validate, asyncHandler(authController.register));
router.post('/login', loginValidation, validate, asyncHandler(authController.login));
router.get('/profile', authenticate, asyncHandler(authController.getProfile));

export default router;

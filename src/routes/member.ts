import { Router } from 'express';
import { MemberController } from '../controllers/member';
import { asyncHandler } from '../utils/async.handler'; 
import { authenticate, adminOnly } from '../middlewares/auth';

const router = Router();
const memberController = new MemberController();

router.get('/', authenticate, adminOnly, asyncHandler(memberController.getAllMembers));
router.get('/:id', authenticate, adminOnly, asyncHandler(memberController.getMemberById));
router.post('/', authenticate, adminOnly, asyncHandler(memberController.createMember));
router.put('/:id', authenticate, adminOnly, asyncHandler(memberController.updateMember));
router.delete('/:id', authenticate, adminOnly, asyncHandler(memberController.deleteMember));

export default router;
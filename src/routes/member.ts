import { Router } from 'express';
import { MemberController } from '../controllers/member';
import { asyncHandler } from '../utils/async.handler'; 

const router = Router();
const memberController = new MemberController();

router.get('/', asyncHandler(memberController.getAllMembers));
router.get('/:id', asyncHandler(memberController.getMemberById));
router.post('/', asyncHandler(memberController.createMember));
router.put('/:id', asyncHandler(memberController.updateMember));
router.delete('/:id', asyncHandler(memberController.deleteMember));

export default router;
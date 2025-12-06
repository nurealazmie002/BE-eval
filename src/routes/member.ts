import { Router } from 'express';
import { MemberController } from '../controllers/member';
import {
  createMemberValidation,
  updateMemberValidation,
  getMemberByIdValidation,
  searchMemberValidation,
} from '../validations/member';
import { validate } from '../middlewares/validate';
import { asyncHandler } from '../utils/async.handler';

const router = Router();
const memberController = new MemberController();

router.get(
  '/',
  searchMemberValidation,
  validate,
  asyncHandler(memberController.getAllMembers.bind(memberController))
);

router.get(
  '/:id',
  getMemberByIdValidation,
  validate,
  asyncHandler(memberController.getMemberById.bind(memberController))
);

router.post(
  '/',
  createMemberValidation,
  validate,
  asyncHandler(memberController.createMember.bind(memberController))
);

router.put(
  '/:id',
  updateMemberValidation,
  validate,
  asyncHandler(memberController.updateMember.bind(memberController))
);

router.delete(
  '/:id',
  getMemberByIdValidation,
  validate,
  asyncHandler(memberController.deleteMember.bind(memberController))
);

export default router;
import { Request, Response } from "express";
import { MemberService } from "../services/member";
import { successResponse } from "../utils/response.helper";

const memberService = new MemberService();

export class MemberController {
  async getAllMembers(req: Request, res: Response) {
    const result = await memberService.getAllMembers(req.query);
    
    return successResponse({
      res,
      message: "Daftar member",
      data: result.members,
      search_result: {
        total: result.total
      }
    });
  }

  async getMemberById(req: Request, res: Response) {
    const member = await memberService.getMemberById(req.params.id);
    return successResponse({ res, message: "Detail member", data: member });
  }

  async createMember(req: Request, res: Response) {
    const newMember = await memberService.createMember(req.body);
    return successResponse({ res, statusCode: 201, message: "Member berhasil dibuat", data: newMember });
  }

  async updateMember(req: Request, res: Response) {
    const updatedMember = await memberService.updateMember(req.params.id, req.body);
    return successResponse({ res, message: "Member berhasil diupdate", data: updatedMember });
  }

  async deleteMember(req: Request, res: Response) {
    const deletedMember = await memberService.deleteMember(req.params.id);
    return successResponse({ res, message: "Member berhasil dihapus", data: deletedMember });
  }
}
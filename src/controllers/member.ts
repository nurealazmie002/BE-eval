import { Request, Response } from "express";
import { MemberService } from "../services/member";
import { successResponse } from "../utils/response.helper";
import { MemberSearchParams } from "../models/member";

const memberService = new MemberService();

export class MemberController {
  async getAllMembers(req: Request, res: Response) {
    const params: MemberSearchParams = {
      search: req.query.search as string,
      status: req.query.status as "active" | "inactive",
    };

    const result = memberService.getAllMembers(params);

    return successResponse({
      res,
      message: "Daftar member",
      data: result.members,
      search_result: {
        total: result.total,
        search: params.search,
        filters: result.filters,
      },
    });
  }

  async getMemberById(req: Request, res: Response) {
    const member = memberService.getMemberById(req.params.id);

    return successResponse({
      res,
      message: "Detail member",
      data: member,
    });
  }

  async createMember(req: Request, res: Response) {
    const newMember = memberService.createMember(req.body);

    return successResponse({
      res,
      statusCode: 201,
      message: "Member berhasil ditambahkan",
      data: newMember,
    });
  }

  async updateMember(req: Request, res: Response) {
    const updatedMember = memberService.updateMember(req.params.id, req.body);

    return successResponse({
      res,
      message: "Member berhasil diupdate",
      data: updatedMember,
    });
  }

  async deleteMember(req: Request, res: Response) {
    const deletedMember = memberService.deleteMember(req.params.id);

    return successResponse({
      res,
      message: "Member berhasil dihapus",
      data: deletedMember,
    });
  }
}

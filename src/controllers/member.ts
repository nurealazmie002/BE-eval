import { Request, Response } from "express";
import { MemberService } from "../services/member.js";
import { successResponse } from "../utils/response.helper.js";
import { MemberRepository } from "../repositories/member.repository.js";

const memberRepository = new MemberRepository();
const memberService = new MemberService(memberRepository);

export class MemberController {
  private readonly memberService: MemberService;

  constructor(memberService: MemberService) {
    this.memberService = memberService;
  }

  public async getAllMembers(req: Request, res: Response) {
    const result = await this.memberService.getAllMembers(req.query);
    
    return successResponse({
      res,
      message: "Daftar member",
      data: result.members,
      search_result: {
        total: result.total
      }
    });
  }

  public async getMemberById(req: Request, res: Response) {
    const member = await this.memberService.getMemberById(req.params.id);
    return successResponse({ res, message: "Detail member", data: member });
  }

  public async createMember(req: Request, res: Response) {
    const newMember = await this.memberService.createMember(req.body);
    return successResponse({ res, statusCode: 201, message: "Member berhasil dibuat", data: newMember });
  }

  public async updateMember(req: Request, res: Response) {
    const updatedMember = await this.memberService.updateMember(req.params.id, req.body);
    return successResponse({ res, message: "Member berhasil diupdate", data: updatedMember });
  }

  public async deleteMember(req: Request, res: Response) {
    const deletedMember = await this.memberService.deleteMember(req.params.id);
    return successResponse({ res, message: "Member berhasil dihapus", data: deletedMember });
  }
}

export const memberController = new MemberController(memberService);
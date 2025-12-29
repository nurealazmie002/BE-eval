import { MemberRepository } from "../repositories/member.repository.js";
import { MemberStatus } from "../generated/client.js"; 

export class MemberService {
  private readonly memberRepository: MemberRepository;

  constructor(memberRepository: MemberRepository) {
    this.memberRepository = memberRepository;
  }

  public async getAllMembers(params: any) {
    const whereClause: any = { deletedAt: null };

    if (params.search) {
      whereClause.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { email: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    if (params.status) {
      whereClause.status = params.status.toUpperCase() as MemberStatus;
    }

    const members = await this.memberRepository.findMany({ where: whereClause });

    return { members, total: members.length };
  }

  public async getMemberById(id: string) {
    const member = await this.memberRepository.findById(id);
    if (!member) throw { statusCode: 404, message: "Member tidak ditemukan" };
    return member;
  }

  public async createMember(data: any) {
    const existing = await this.memberRepository.findByEmail(data.email);
    if (existing) throw { statusCode: 400, message: "Email sudah terdaftar" };

    return await this.memberRepository.create({
      name: data.nama,
      email: data.email,
      password: data.password || '',
      phone: data.telepon || null,
      address: data.alamat || null,
      status: 'ACTIVE',
    });
  }

  public async updateMember(id: string, data: any) {
    await this.getMemberById(id);

    return await this.memberRepository.update(id, {
      name: data.nama,
      email: data.email,
      phone: data.telepon || null,
      address: data.alamat || null,
      status: data.status ? (data.status.toUpperCase() as MemberStatus) : undefined,
    });
  }

  public async deleteMember(id: string) {
    await this.getMemberById(id);
    return await this.memberRepository.softDelete(id);
  }
}
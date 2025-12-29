import { MemberRepository } from "../repositories/member.repository";
import { MemberStatus } from "../generated/client"; 

const memberRepository = new MemberRepository();

export class MemberService {
  async getAllMembers(params: any) {
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

    const members = await memberRepository.findMany({ where: whereClause });

    return { members, total: members.length };
  }

  async getMemberById(id: string) {
    const member = await memberRepository.findById(id);
    if (!member) throw { statusCode: 404, message: "Member tidak ditemukan" };
    return member;
  }

  async createMember(data: any) {
    const existing = await memberRepository.findByEmail(data.email);
    if (existing) throw { statusCode: 400, message: "Email sudah terdaftar" };

    return await memberRepository.create({
      name: data.nama,
      email: data.email,
      password: data.password || '',
      phone: data.telepon || null,
      address: data.alamat || null,
      status: 'ACTIVE',
    });
  }

  async updateMember(id: string, data: any) {
    await this.getMemberById(id);

    return await memberRepository.update(id, {
      name: data.nama,
      email: data.email,
      phone: data.telepon || null,
      address: data.alamat || null,
      status: data.status ? (data.status.toUpperCase() as MemberStatus) : undefined,
    });
  }

  async deleteMember(id: string) {
    await this.getMemberById(id);
    return await memberRepository.softDelete(id);
  }
}
import prisma from "../prisma"; 
import { MemberStatus } from "@prisma/client"; 

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

    const members = await prisma.member.findMany({
      where: whereClause,
    });

    return { members, total: members.length };
  }

  async getMemberById(id: string) {
    const member = await prisma.member.findFirst({
      where: { id, deletedAt: null },
    });
    if (!member) throw { statusCode: 404, message: "Member tidak ditemukan" };
    return member;
  }

  async createMember(data: any) {
    const existing = await prisma.member.findFirst({
        where: { email: data.email }
    });
    if (existing) throw { statusCode: 400, message: "Email sudah terdaftar" };

    return await prisma.member.create({
      data: {
        name: data.nama,
        email: data.email,
        phone: data.telepon,
        address: data.alamat,
        status: 'ACTIVE',
      },
    });
  }

  async updateMember(id: string, data: any) {
    await this.getMemberById(id);

    return await prisma.member.update({
      where: { id },
      data: {
        name: data.nama,
        email: data.email,
        phone: data.telepon,
        address: data.alamat,
        status: data.status ? (data.status.toUpperCase() as MemberStatus) : undefined,
      },
    });
  }

  async deleteMember(id: string) {
    await this.getMemberById(id);
    return await prisma.member.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
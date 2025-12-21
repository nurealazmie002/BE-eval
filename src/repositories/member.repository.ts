import prisma from "../prisma";

export class MemberRepository {
  async findMany(options: {
    where?: any;
    include?: any;
    skip?: number;
    take?: number;
    orderBy?: any;
  }) {
    return await prisma.member.findMany(options);
  }

  async findFirst(where: any) {
    return await prisma.member.findFirst({ where });
  }

  async findById(id: string) {
    return await prisma.member.findFirst({
      where: { id, deletedAt: null }
    });
  }

  async findByEmail(email: string) {
    return await prisma.member.findFirst({
      where: { email }
    });
  }

  async create(data: any) {
    return await prisma.member.create({ data });
  }

  async update(id: string, data: any) {
    return await prisma.member.update({ where: { id }, data });
  }

  async softDelete(id: string) {
    return await prisma.member.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }
}

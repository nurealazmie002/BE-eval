import prisma from "../prisma.js";

export class MemberRepository {
  private readonly db = prisma;

  public async findMany(options: {
    where?: any;
    include?: any;
    skip?: number;
    take?: number;
    orderBy?: any;
  }) {
    return await this.db.member.findMany(options);
  }

  public async findFirst(where: any) {
    return await this.db.member.findFirst({ where });
  }

  public async findById(id: string) {
    return await this.db.member.findFirst({
      where: { id, deletedAt: null }
    });
  }

  public async findByEmail(email: string) {
    return await this.db.member.findFirst({
      where: { email }
    });
  }

  public async create(data: any) {
    return await this.db.member.create({ data });
  }

  public async update(id: string, data: any) {
    return await this.db.member.update({ where: { id }, data });
  }

  public async softDelete(id: string) {
    return await this.db.member.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }
}

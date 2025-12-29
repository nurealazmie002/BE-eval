import prisma from "../prisma.js";

export class BookRepository {
  private readonly db = prisma;

  public async findMany(options: {
    where?: any;
    include?: any;
    skip?: number;
    take?: number;
    orderBy?: any;
  }) {
    return await this.db.book.findMany(options);
  }

  public async findFirst(where: any, include?: any) {
    return await this.db.book.findFirst({ where, include });
  }

  public async count(where: any) {
    return await this.db.book.count({ where });
  }

  public async create(data: any) {
    return await this.db.book.create({ data });
  }

  public async update(id: string, data: any) {
    return await this.db.book.update({ where: { id }, data });
  }

  public async softDelete(id: string) {
    return await this.db.book.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }
}

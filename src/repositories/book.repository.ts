import prisma from "../prisma.js";

export class BookRepository {
  async findMany(options: {
    where?: any;
    include?: any;
    skip?: number;
    take?: number;
    orderBy?: any;
  }) {
    return await prisma.book.findMany(options);
  }

  async findFirst(where: any, include?: any) {
    return await prisma.book.findFirst({ where, include });
  }

  async count(where: any) {
    return await prisma.book.count({ where });
  }

  async create(data: any) {
    return await prisma.book.create({ data });
  }

  async update(id: string, data: any) {
    return await prisma.book.update({ where: { id }, data });
  }

  async softDelete(id: string) {
    return await prisma.book.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }
}

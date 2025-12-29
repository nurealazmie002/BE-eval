import prisma from "../prisma.js";

export class BorrowRepository {
  async findMany(options: {
    where?: any;
    include?: any;
    orderBy?: any;
  }) {
    return await prisma.borrowRecord.findMany(options);
  }

  async findFirst(where: any, include?: any) {
    return await prisma.borrowRecord.findFirst({ where, include });
  }

  async findById(id: string, include?: any) {
    return await prisma.borrowRecord.findFirst({
      where: { id, deletedAt: null },
      include
    });
  }

  async create(data: any, include?: any) {
    return await prisma.borrowRecord.create({ data, include });
  }

  async update(id: string, data: any, include?: any) {
    return await prisma.borrowRecord.update({ where: { id }, data, include });
  }

  async softDelete(id: string) {
    return await prisma.borrowRecord.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async transaction<T>(fn: (tx: any) => Promise<T>): Promise<T> {
    return await prisma.$transaction(fn);
  }
}

export class BookRepository {
  async findMany(where: any) {
    return await prisma.book.findMany({ where });
  }

  async findById(id: string) {
    return await prisma.book.findFirst({
      where: { id, deletedAt: null }
    });
  }

  async updateStock(tx: any, bookId: string, operation: 'increment' | 'decrement', quantity: number) {
    return await tx.book.update({
      where: { id: bookId },
      data: { stock: { [operation]: quantity } }
    });
  }
}

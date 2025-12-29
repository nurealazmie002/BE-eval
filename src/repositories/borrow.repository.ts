import prisma from "../prisma.js";

export class BorrowRepository {
  private readonly db = prisma;

  public async findMany(options: {
    where?: any;
    include?: any;
    orderBy?: any;
  }) {
    return await this.db.borrowRecord.findMany(options);
  }

  public async findFirst(where: any, include?: any) {
    return await this.db.borrowRecord.findFirst({ where, include });
  }

  public async findById(id: string, include?: any) {
    return await this.db.borrowRecord.findFirst({
      where: { id, deletedAt: null },
      include
    });
  }

  public async create(data: any, include?: any) {
    return await this.db.borrowRecord.create({ data, include });
  }

  public async update(id: string, data: any, include?: any) {
    return await this.db.borrowRecord.update({ where: { id }, data, include });
  }

  public async softDelete(id: string) {
    return await this.db.borrowRecord.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  public async transaction<T>(fn: (tx: any) => Promise<T>): Promise<T> {
    return await this.db.$transaction(fn);
  }
}

export class BorrowBookRepository {
  private readonly db = prisma;

  public async findMany(where: any) {
    return await this.db.book.findMany({ where });
  }

  public async findById(id: string) {
    return await this.db.book.findFirst({
      where: { id, deletedAt: null }
    });
  }

  public async updateStock(tx: any, bookId: string, operation: 'increment' | 'decrement', quantity: number) {
    return await tx.book.update({
      where: { id: bookId },
      data: { stock: { [operation]: quantity } }
    });
  }
}

import prisma from "../prisma.js";

export class CategoryRepository {
  private readonly db = prisma;

  public async findMany(where?: any) {
    return await this.db.category.findMany({ where });
  }

  public async findFirst(where: any) {
    return await this.db.category.findFirst({ where });
  }

  public async findById(id: string) {
    return await this.db.category.findFirst({
      where: { id, deletedAt: null }
    });
  }

  public async findByName(name: string) {
    return await this.db.category.findFirst({
      where: { name, deletedAt: null }
    });
  }

  public async create(data: any) {
    return await this.db.category.create({ data });
  }

  public async update(id: string, data: any) {
    return await this.db.category.update({ where: { id }, data });
  }

  public async softDelete(id: string) {
    return await this.db.category.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }
}

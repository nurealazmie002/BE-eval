import prisma from "../prisma";

export class CategoryRepository {
  async findMany(where?: any) {
    return await prisma.category.findMany({ where });
  }

  async findFirst(where: any) {
    return await prisma.category.findFirst({ where });
  }

  async findById(id: string) {
    return await prisma.category.findFirst({
      where: { id, deletedAt: null }
    });
  }

  async findByName(name: string) {
    return await prisma.category.findFirst({
      where: { name, deletedAt: null }
    });
  }

  async create(data: any) {
    return await prisma.category.create({ data });
  }

  async update(id: string, data: any) {
    return await prisma.category.update({ where: { id }, data });
  }

  async softDelete(id: string) {
    return await prisma.category.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }
}

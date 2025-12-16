import prisma from "../prisma"; 
export class CategoryService {
  async getAllCategories() {
    return await prisma.category.findMany({
      where: { deletedAt: null },
    });
  }

  async getCategoryById(id: string) {
    const category = await prisma.category.findFirst({
      where: { id, deletedAt: null },
    });
    if (!category) throw { statusCode: 404, message: "Kategori tidak ditemukan" };
    return category;
  }

  async createCategory(data: { name: string; description?: string }) {
    return await prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }

  async updateCategory(id: string, data: any) {
    await this.getCategoryById(id);
    return await prisma.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: string) {
    await this.getCategoryById(id);
    return await prisma.category.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
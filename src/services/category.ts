import { CategoryRepository } from "../repositories/category.repository";

const categoryRepository = new CategoryRepository();

export class CategoryService {
  async getAllCategories() {
    return await categoryRepository.findMany({ deletedAt: null });
  }

  async getCategoryById(id: string) {
    const category = await categoryRepository.findById(id);
    if (!category) throw { statusCode: 404, message: "Kategori tidak ditemukan" };
    return category;
  }

  async createCategory(data: { name: string; description?: string }) {
    return await categoryRepository.create({
      name: data.name,
      description: data.description,
    });
  }

  async updateCategory(id: string, data: any) {
    await this.getCategoryById(id);
    return await categoryRepository.update(id, data);
  }

  async deleteCategory(id: string) {
    await this.getCategoryById(id);
    return await categoryRepository.softDelete(id);
  }
}
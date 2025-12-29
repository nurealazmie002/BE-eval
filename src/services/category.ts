import { CategoryRepository } from "../repositories/category.repository.js";

export class CategoryService {
  private readonly categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  public async getAllCategories() {
    return await this.categoryRepository.findMany({ deletedAt: null });
  }

  public async getCategoryById(id: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw { statusCode: 404, message: "Kategori tidak ditemukan" };
    return category;
  }

  public async createCategory(data: { name: string; description?: string }) {
    return await this.categoryRepository.create({
      name: data.name,
      description: data.description,
    });
  }

  public async updateCategory(id: string, data: any) {
    await this.getCategoryById(id);
    return await this.categoryRepository.update(id, data);
  }

  public async deleteCategory(id: string) {
    await this.getCategoryById(id);
    return await this.categoryRepository.softDelete(id);
  }
}
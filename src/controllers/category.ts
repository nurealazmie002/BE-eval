import { Request, Response } from 'express';
import { CategoryService } from '../services/category.js';
import { successResponse } from '../utils/response.helper.js';
import { CategoryRepository } from '../repositories/category.repository.js';

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);

export class CategoryController {
  private readonly categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  public async getAll(req: Request, res: Response) {
    const result = await this.categoryService.getAllCategories();
    return successResponse({ res, message: 'Daftar Kategori', data: result });
  }

  public async getById(req: Request, res: Response) {
    const result = await this.categoryService.getCategoryById(req.params.id);
    return successResponse({ res, message: 'Detail Kategori', data: result });
  }

  public async create(req: Request, res: Response) {
    const result = await this.categoryService.createCategory(req.body);
    return successResponse({ res, statusCode: 201, message: 'Kategori berhasil dibuat', data: result });
  }

  public async update(req: Request, res: Response) {
    const result = await this.categoryService.updateCategory(req.params.id, req.body);
    return successResponse({ res, message: 'Kategori berhasil diupdate', data: result });
  }

  public async delete(req: Request, res: Response) {
    const result = await this.categoryService.deleteCategory(req.params.id);
    return successResponse({ res, message: 'Kategori dihapus (Soft Delete)', data: result });
  }
}

export const categoryController = new CategoryController(categoryService);
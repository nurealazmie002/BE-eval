import { Request, Response } from 'express';
import { CategoryService } from '../services/category';
import { successResponse } from '../utils/response.helper';

const categoryService = new CategoryService();

export class CategoryController {
  async getAll(req: Request, res: Response) {
    const result = await categoryService.getAllCategories();
    return successResponse({ res, message: 'Daftar Kategori', data: result });
  }

  async getById(req: Request, res: Response) {
    const result = await categoryService.getCategoryById(req.params.id);
    return successResponse({ res, message: 'Detail Kategori', data: result });
  }

  async create(req: Request, res: Response) {
    const result = await categoryService.createCategory(req.body);
    return successResponse({ res, statusCode: 201, message: 'Kategori berhasil dibuat', data: result });
  }

  async update(req: Request, res: Response) {
    const result = await categoryService.updateCategory(req.params.id, req.body);
    return successResponse({ res, message: 'Kategori berhasil diupdate', data: result });
  }

  async delete(req: Request, res: Response) {
    const result = await categoryService.deleteCategory(req.params.id);
    return successResponse({ res, message: 'Kategori dihapus (Soft Delete)', data: result });
  }
}
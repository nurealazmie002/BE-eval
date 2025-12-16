import { Request, Response } from 'express';
import { BookService } from '../services/book'; 
import { successResponse } from '../utils/response.helper';

const bookService = new BookService();

export class BookController {
  async getAllBooks(req: Request, res: Response) {
    const result = await bookService.getAllBooks(req.query);
    return successResponse({ res, message: 'Daftar buku', data: result.books, search_result: { total: result.total } });
  }
  async getBookById(req: Request, res: Response) {
    const book = await bookService.getBookById(req.params.id);
    return successResponse({ res, message: 'Detail buku', data: book });
  }
  async createBook(req: Request, res: Response) {
    const newBook = await bookService.createBook(req.body);
    return successResponse({ res, statusCode: 201, message: 'Buku berhasil dibuat', data: newBook });
  }
  async updateBook(req: Request, res: Response) {
    const updatedBook = await bookService.updateBook(req.params.id, req.body);
    return successResponse({ res, message: 'Buku berhasil diupdate', data: updatedBook });
  }
  async deleteBook(req: Request, res: Response) {
    const deletedBook = await bookService.deleteBook(req.params.id);
    return successResponse({ res, message: 'Buku berhasil dihapus (Soft Delete)', data: deletedBook });
  }
}
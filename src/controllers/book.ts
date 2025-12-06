import { Request, Response } from 'express';
import { BookService } from '../services/book';
import { successResponse } from '../utils/response.helper';
import { BookSearchParams } from '../models/book';

const bookService = new BookService();

export class BookController {
  async getAllBooks(req: Request, res: Response) {
    const params: BookSearchParams = {
      search: req.query.search as string,
      kategori: req.query.kategori as string,
      min_tahun: req.query.min_tahun ? parseInt(req.query.min_tahun as string) : undefined,
      max_tahun: req.query.max_tahun ? parseInt(req.query.max_tahun as string) : undefined,
    };

    const result = bookService.getAllBooks(params);

    return successResponse({
      res,
      message: 'Daftar buku',
      data: result.books,
      search_result: {
        total: result.total,
        search: params.search,
        filters: result.filters,
      },
    });
  }

  async getBookById(req: Request, res: Response) {
    const book = bookService.getBookById(req.params.id);

    return successResponse({
      res,
      message: 'Detail buku',
      data: book,
    });
  }

  async createBook(req: Request, res: Response) {
    const newBook = bookService.createBook(req.body);

    return successResponse({
      res,
      statusCode: 201,
      message: 'Buku berhasil ditambahkan',
      data: newBook,
    });
  }

  async updateBook(req: Request, res: Response) {
    const updatedBook = bookService.updateBook(req.params.id, req.body);

    return successResponse({
      res,
      message: 'Buku berhasil diupdate',
      data: updatedBook,
    });
  }

  async deleteBook(req: Request, res: Response) {
    const deletedBook = bookService.deleteBook(req.params.id);

    return successResponse({
      res,
      message: 'Buku berhasil dihapus',
      data: deletedBook,
    });
  }
}
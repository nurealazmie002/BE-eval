import { Request, Response } from 'express';
import { BookService } from '../services/book.js'; 
import { successResponse } from '../utils/response.helper.js';
import { BookRepository } from '../repositories/book.repository.js';

const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);

export class BookController {
  private readonly bookService: BookService;

  constructor(bookService: BookService) {
    this.bookService = bookService;
  }

  public async getAllBooks(req: Request, res: Response) {
    const result = await this.bookService.getAllBooks(req.query);
    return successResponse({ 
      res, 
      message: 'Daftar buku', 
      data: result.books, 
      pagination: result.pagination,
      filters: result.filters 
    });
  }

  public async getBookById(req: Request, res: Response) {
    const book = await this.bookService.getBookById(req.params.id);
    return successResponse({ res, message: 'Detail buku', data: book });
  }

  public async createBook(req: Request, res: Response) {
    const data = { ...req.body };
    if (req.file) {
      data.coverImage = `/uploads/${req.file.filename}`;
    }
    const newBook = await this.bookService.createBook(data);
    return successResponse({ res, statusCode: 201, message: 'Buku berhasil dibuat', data: newBook });
  }

  public async updateBook(req: Request, res: Response) {
    const data = { ...req.body };
    if (req.file) {
      data.coverImage = `/uploads/${req.file.filename}`;
    }
    const updatedBook = await this.bookService.updateBook(req.params.id, data);
    return successResponse({ res, message: 'Buku berhasil diupdate', data: updatedBook });
  }

  public async deleteBook(req: Request, res: Response) {
    const deletedBook = await this.bookService.deleteBook(req.params.id);
    return successResponse({ res, message: 'Buku berhasil dihapus (Soft Delete)', data: deletedBook });
  }
}

export const bookController = new BookController(bookService);
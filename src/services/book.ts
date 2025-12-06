import { v4 as uuidv4 } from 'uuid';
import { Book, CreateBookDTO, UpdateBookDTO, BookSearchParams } from '../models/book';

let books: Book[] = [
  {
    id: uuidv4(),
    judul: 'Harry Potter dan Batu Bertuah',
    penulis: 'J.K. Rowling',
    penerbit: 'Gramedia',
    tahun_terbit: 1997,
    kategori: 'fiksi',
    stok: 5,
  },
  {
    id: uuidv4(),
    judul: 'Laskar Pelangi',
    penulis: 'Andrea Hirata',
    penerbit: 'Bentang Pustaka',
    tahun_terbit: 2005,
    kategori: 'fiksi',
    stok: 3,
  },
  {
    id: uuidv4(),
    judul: 'Sapiens',
    penulis: 'Yuval Noah Harari',
    penerbit: 'Pustaka Alvabet',
    tahun_terbit: 2011,
    kategori: 'non-fiksi',
    stok: 7,
  },
];

export class BookService {
  getAllBooks(params: BookSearchParams) {
    let filteredBooks = [...books];

    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.judul.toLowerCase().includes(searchLower) ||
          book.penulis.toLowerCase().includes(searchLower)
      );
    }

    if (params.kategori) {
      filteredBooks = filteredBooks.filter((book) => book.kategori === params.kategori);
    }

    if (params.min_tahun) {
      filteredBooks = filteredBooks.filter((book) => book.tahun_terbit >= params.min_tahun!);
    }

    if (params.max_tahun) {
      filteredBooks = filteredBooks.filter((book) => book.tahun_terbit <= params.max_tahun!);
    }

    return {
      books: filteredBooks,
      total: filteredBooks.length,
      filters: {
        search: params.search,
        kategori: params.kategori,
        min_tahun: params.min_tahun,
        max_tahun: params.max_tahun,
      },
    };
  }

  getBookById(id: string) {
    const book = books.find((b) => b.id === id);
    if (!book) {
      throw { statusCode: 404, message: 'Buku tidak ditemukan' };
    }
    return book;
  }

  createBook(data: CreateBookDTO) {
    const newBook: Book = {
      id: uuidv4(),
      ...data,
    };

    books.push(newBook);
    return newBook;
  }

  updateBook(id: string, data: UpdateBookDTO) {
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) {
      throw { statusCode: 404, message: 'Buku tidak ditemukan' };
    }

    books[index] = {
      ...books[index],
      ...data,
    };

    return books[index];
  }

  deleteBook(id: string) {
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) {
      throw { statusCode: 404, message: 'Buku tidak ditemukan' };
    }

    const deletedBook = books[index];
    books.splice(index, 1);
    return deletedBook;
  }
}
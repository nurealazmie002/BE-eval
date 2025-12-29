import { BookRepository } from "../repositories/book.repository";

const bookRepository = new BookRepository();

export class BookService {
  async getAllBooks(params: any) {
    const whereClause: any = {
      deletedAt: null,
    };

    if (params.search) {
      whereClause.OR = [
        { title: { contains: params.search, mode: 'insensitive' } },
        { author: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    if (params.kategori) {
      whereClause.category = {
        name: { equals: params.kategori, mode: 'insensitive' }
      };
    }

    if (params.categories) {
      const categoryIds = params.categories.split(',').map((id: string) => id.trim());
      whereClause.categoryId = { in: categoryIds };
    }

    if (params.inStock === 'true') {
      whereClause.stock = { gt: 0 };
    } else if (params.inStock === 'false') {
      whereClause.stock = { equals: 0 };
    }

    if (params.min_tahun || params.max_tahun) {
      whereClause.publicationYear = {};
      if (params.min_tahun) whereClause.publicationYear.gte = Number(params.min_tahun);
      if (params.max_tahun) whereClause.publicationYear.lte = Number(params.max_tahun);
    }

    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(params.limit) || 10));
    const skip = (page - 1) * limit;

    const allowedSortFields = ['title', 'author', 'publicationYear', 'stock', 'createdAt'];
    const sortBy = allowedSortFields.includes(params.sortBy) ? params.sortBy : 'createdAt';
    const sortOrder = params.sortOrder === 'asc' ? 'asc' : 'desc';

    const total = await bookRepository.count(whereClause);

    const books = await bookRepository.findMany({
      where: whereClause,
      include: { category: true },
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      books,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      filters: {
        search: params.search || null,
        kategori: params.kategori || null,
        categories: params.categories || null,
        inStock: params.inStock || null,
        min_tahun: params.min_tahun || null,
        max_tahun: params.max_tahun || null,
        sortBy,
        sortOrder,
      },
    };
  }

  async getBookById(id: string) {
    const book = await bookRepository.findFirst(
      { id, deletedAt: null },
      { category: true }
    );
    if (!book) throw { statusCode: 404, message: 'Buku tidak ditemukan' };
    return book;
  }

  async createBook(data: any) {
    if (!data.categoryId) throw { statusCode: 400, message: "categoryId wajib diisi" };

    return await bookRepository.create({
      title: data.judul,
      author: data.penulis,
      publisher: data.penerbit,
      publicationYear: data.tahun_terbit,
      stock: data.stok,
      categoryId: data.categoryId,
      coverImage: data.coverImage || null,
    });
  }

  async updateBook(id: string, data: any) {
    await this.getBookById(id);
    return await bookRepository.update(id, {
      title: data.judul,
      author: data.penulis,
      publisher: data.penerbit,
      publicationYear: data.tahun_terbit,
      stock: data.stok,
      categoryId: data.categoryId,
      coverImage: data.coverImage,
    });
  }

  async deleteBook(id: string) {
    await this.getBookById(id);
    return await bookRepository.softDelete(id);
  }
}
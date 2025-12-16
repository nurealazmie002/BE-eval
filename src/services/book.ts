import prisma from "../prisma"; 
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

    if (params.min_tahun || params.max_tahun) {
      whereClause.publicationYear = {};
      if (params.min_tahun) whereClause.publicationYear.gte = Number(params.min_tahun);
      if (params.max_tahun) whereClause.publicationYear.lte = Number(params.max_tahun);
    }

    const books = await prisma.book.findMany({
      where: whereClause,
      include: { category: true },
    });

    return { books, total: books.length, filters: params };
  }

  async getBookById(id: string) {
    const book = await prisma.book.findFirst({
      where: { id, deletedAt: null },
      include: { category: true },
    });
    if (!book) throw { statusCode: 404, message: 'Buku tidak ditemukan' };
    return book;
  }

  async createBook(data: any) {
    if (!data.categoryId) throw { statusCode: 400, message: "categoryId wajib diisi" };

    return await prisma.book.create({
      data: {
        title: data.judul,
        author: data.penulis,
        publisher: data.penerbit,
        publicationYear: data.tahun_terbit,
        stock: data.stok,
        categoryId: data.categoryId,
      },
    });
  }

  async updateBook(id: string, data: any) {
    await this.getBookById(id);
    return await prisma.book.update({
      where: { id },
      data: {
        title: data.judul,
        author: data.penulis,
        publisher: data.penerbit,
        publicationYear: data.tahun_terbit,
        stock: data.stok,
        categoryId: data.categoryId,
      },
    });
  }

  async deleteBook(id: string) {
    await this.getBookById(id);
    return await prisma.book.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
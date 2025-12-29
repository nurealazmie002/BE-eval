import prisma from "../prisma.js";

export class StatsService {
  async getAdminStats() {
    const totalAvailableBooks = await prisma.book.count({
      where: {
        deletedAt: null,
        stock: { gt: 0 }
      }
    });

    const activeBorrowings = await prisma.borrowRecord.count({
      where: {
        deletedAt: null,
        status: 'BORROWED'
      }
    });

    const mostPopularBook = await prisma.borrowItem.groupBy({
      by: ['bookId'],
      _sum: {
        quantity: true
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 1
    });

    let popularBookDetails = null;
    if (mostPopularBook.length > 0) {
      const bookId = mostPopularBook[0].bookId;
      const book = await prisma.book.findFirst({
        where: { id: bookId },
        select: {
          id: true,
          title: true,
          author: true,
          coverImage: true
        }
      });
      popularBookDetails = {
        ...book,
        borrowCount: mostPopularBook[0]._sum.quantity || 0
      };
    }

    const totalBooks = await prisma.book.count({
      where: { deletedAt: null }
    });

    const totalMembers = await prisma.member.count({
      where: { deletedAt: null }
    });

    const totalBorrowRecords = await prisma.borrowRecord.count({
      where: { deletedAt: null }
    });

    return {
      totalBooks,
      totalAvailableBooks,
      totalMembers,
      totalBorrowRecords,
      activeBorrowings,
      mostPopularBook: popularBookDetails
    };
  }
}

import { BorrowRepository, BookRepository } from "../repositories/borrow.repository";
import { MemberRepository } from "../repositories/member.repository";

interface BorrowItemInput {
  bookId: string;
  quantity?: number;
}

interface BorrowBooksInput {
  memberId: string;
  dueDate: string;
  items: BorrowItemInput[];
}

const borrowRepository = new BorrowRepository();
const bookRepository = new BookRepository();
const memberRepository = new MemberRepository();

export class BorrowService {
  async getAllBorrowRecords(params: any) {
    const whereClause: any = {
      deletedAt: null,
    };

    if (params.memberId) {
      whereClause.memberId = params.memberId;
    }

    if (params.status) {
      whereClause.status = params.status;
    }

    const borrowRecords = await borrowRepository.findMany({
      where: whereClause,
      include: {
        member: {
          select: { id: true, name: true, email: true }
        },
        items: {
          include: {
            book: {
              select: { id: true, title: true, author: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return { borrowRecords, total: borrowRecords.length, filters: params };
  }

  async getBorrowRecordById(id: string) {
    const borrowRecord = await borrowRepository.findById(id, {
      member: {
        select: { id: true, name: true, email: true, phone: true, address: true }
      },
      items: {
        include: {
          book: {
            select: { id: true, title: true, author: true, publisher: true }
          }
        }
      }
    });

    if (!borrowRecord) {
      throw { statusCode: 404, message: 'Data peminjaman tidak ditemukan' };
    }

    return borrowRecord;
  }

  async borrowBooks(data: BorrowBooksInput) {
    const member = await memberRepository.findById(data.memberId);
    if (!member) {
      throw { statusCode: 404, message: 'Member tidak ditemukan' };
    }

    const bookIds = data.items.map(item => item.bookId);
    const books = await bookRepository.findMany({ id: { in: bookIds }, deletedAt: null });

    if (books.length !== bookIds.length) {
      throw { statusCode: 404, message: 'Satu atau lebih buku tidak ditemukan' };
    }

    for (const item of data.items) {
      const book = books.find(b => b.id === item.bookId);
      const quantity = item.quantity || 1;
      if (book && book.stock < quantity) {
        throw { 
          statusCode: 400, 
          message: `Stok buku "${book.title}" tidak mencukupi. Tersedia: ${book.stock}, Diminta: ${quantity}` 
        };
      }
    }

    const result = await borrowRepository.transaction(async (tx) => {
      const borrowRecord = await tx.borrowRecord.create({
        data: {
          memberId: data.memberId,
          dueDate: new Date(data.dueDate),
          status: 'BORROWED',
          items: {
            create: data.items.map(item => ({
              bookId: item.bookId,
              quantity: item.quantity || 1
            }))
          }
        },
        include: {
          member: { select: { id: true, name: true, email: true } },
          items: {
            include: {
              book: { select: { id: true, title: true, author: true, stock: true } }
            }
          }
        }
      });

      for (const item of data.items) {
        const quantity = item.quantity || 1;
        await bookRepository.updateStock(tx, item.bookId, 'decrement', quantity);
      }

      return borrowRecord;
    });

    return result;
  }

  async returnBooks(id: string) {
    const borrowRecord = await this.getBorrowRecordById(id);

    if (borrowRecord.status === 'RETURNED') {
      throw { statusCode: 400, message: 'Buku sudah dikembalikan sebelumnya' };
    }

    const result = await borrowRepository.transaction(async (tx) => {
      const updatedRecord = await tx.borrowRecord.update({
        where: { id },
        data: {
          status: 'RETURNED',
          returnDate: new Date()
        },
        include: {
          member: { select: { id: true, name: true, email: true } },
          items: {
            include: {
              book: { select: { id: true, title: true, author: true } }
            }
          }
        }
      });

      for (const item of borrowRecord.items) {
        await bookRepository.updateStock(tx, item.bookId, 'increment', item.quantity);
      }

      return updatedRecord;
    });

    return result;
  }

  async deleteBorrowRecord(id: string) {
    await this.getBorrowRecordById(id);
    return await borrowRepository.softDelete(id);
  }

  async getMyBorrowings(memberId: string) {
    const borrowRecords = await borrowRepository.findMany({
      where: { memberId, deletedAt: null },
      include: {
        items: {
          include: {
            book: {
              select: { id: true, title: true, author: true, coverImage: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return { borrowRecords, total: borrowRecords.length };
  }
}

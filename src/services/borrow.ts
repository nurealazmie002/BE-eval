import { BorrowRepository, BorrowBookRepository } from "../repositories/borrow.repository.js";
import { MemberRepository } from "../repositories/member.repository.js";

interface BorrowItemInput {
  bookId: string;
  quantity?: number;
}

interface BorrowBooksInput {
  memberId: string;
  dueDate: string;
  items: BorrowItemInput[];
}

export class BorrowService {
  private readonly borrowRepository: BorrowRepository;
  private readonly bookRepository: BorrowBookRepository;
  private readonly memberRepository: MemberRepository;

  constructor(
    borrowRepository: BorrowRepository,
    bookRepository: BorrowBookRepository,
    memberRepository: MemberRepository
  ) {
    this.borrowRepository = borrowRepository;
    this.bookRepository = bookRepository;
    this.memberRepository = memberRepository;
  }

  public async getAllBorrowRecords(params: any) {
    const whereClause: any = {
      deletedAt: null,
    };

    if (params.memberId) {
      whereClause.memberId = params.memberId;
    }

    if (params.status) {
      whereClause.status = params.status;
    }

    if (params.startDate || params.endDate) {
      whereClause.borrowDate = {};
      if (params.startDate) {
        whereClause.borrowDate.gte = new Date(params.startDate);
      }
      if (params.endDate) {
        const endDate = new Date(params.endDate);
        endDate.setHours(23, 59, 59, 999);
        whereClause.borrowDate.lte = endDate;
      }
    }

    if (params.memberName) {
      whereClause.member = {
        name: { contains: params.memberName, mode: 'insensitive' }
      };
    }

    const borrowRecords = await this.borrowRepository.findMany({
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

  public async getBorrowRecordById(id: string) {
    const borrowRecord = await this.borrowRepository.findById(id, {
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

  public async borrowBooks(data: BorrowBooksInput) {
    const member = await this.memberRepository.findById(data.memberId);
    if (!member) {
      throw { statusCode: 404, message: 'Member tidak ditemukan' };
    }

    const bookIds = data.items.map(item => item.bookId);
    const books = await this.bookRepository.findMany({ id: { in: bookIds }, deletedAt: null });

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

    const bookRepository = this.bookRepository;
    const result = await this.borrowRepository.transaction(async (tx) => {
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

  public async returnBooks(id: string) {
    const borrowRecord = await this.getBorrowRecordById(id);

    if (borrowRecord.status === 'RETURNED') {
      throw { statusCode: 400, message: 'Buku sudah dikembalikan sebelumnya' };
    }

    const bookRepository = this.bookRepository;
    const result = await this.borrowRepository.transaction(async (tx) => {
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

  public async deleteBorrowRecord(id: string) {
    await this.getBorrowRecordById(id);
    return await this.borrowRepository.softDelete(id);
  }

  public async getMyBorrowings(memberId: string) {
    const borrowRecords = await this.borrowRepository.findMany({
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

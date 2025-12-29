import { Request, Response } from 'express';
import { BorrowService } from '../services/borrow.js';
import { successResponse } from '../utils/response.helper.js';
import { AuthRequest } from '../middlewares/auth.js';
import { BorrowRepository, BorrowBookRepository } from '../repositories/borrow.repository.js';
import { MemberRepository } from '../repositories/member.repository.js';

const borrowRepository = new BorrowRepository();
const bookRepository = new BorrowBookRepository();
const memberRepository = new MemberRepository();
const borrowService = new BorrowService(borrowRepository, bookRepository, memberRepository);

export class BorrowController {
  private readonly borrowService: BorrowService;

  constructor(borrowService: BorrowService) {
    this.borrowService = borrowService;
  }

  public async getAllBorrowRecords(req: Request, res: Response) {
    const result = await this.borrowService.getAllBorrowRecords(req.query);
    return successResponse({ 
      res, 
      message: 'Daftar peminjaman', 
      data: result.borrowRecords, 
      search_result: { total: result.total } 
    });
  }

  public async getBorrowRecordById(req: Request, res: Response) {
    const borrowRecord = await this.borrowService.getBorrowRecordById(req.params.id);
    return successResponse({ res, message: 'Detail peminjaman', data: borrowRecord });
  }

  public async borrowBooks(req: AuthRequest, res: Response) {
    const data = {
      ...req.body,
      memberId: req.user?.id
    };
    const newBorrowRecord = await this.borrowService.borrowBooks(data);
    return successResponse({ 
      res, 
      statusCode: 201, 
      message: 'Peminjaman berhasil dibuat. Stok buku telah dikurangi.', 
      data: newBorrowRecord 
    });
  }

  public async returnBooks(req: Request, res: Response) {
    const returnedRecord = await this.borrowService.returnBooks(req.params.id);
    return successResponse({ 
      res, 
      message: 'Buku berhasil dikembalikan. Stok buku telah ditambahkan kembali.', 
      data: returnedRecord 
    });
  }

  public async deleteBorrowRecord(req: Request, res: Response) {
    const deletedRecord = await this.borrowService.deleteBorrowRecord(req.params.id);
    return successResponse({ 
      res, 
      message: 'Data peminjaman berhasil dihapus (Soft Delete)', 
      data: deletedRecord 
    });
  }

  public async getMyBorrowings(req: AuthRequest, res: Response) {
    const memberId = req.user?.id;
    if (!memberId) {
      return res.status(401).json({ success: false, message: 'User tidak terautentikasi' });
    }
    const result = await this.borrowService.getMyBorrowings(memberId);
    return successResponse({ 
      res, 
      message: 'Riwayat peminjaman saya', 
      data: result.borrowRecords,
      search_result: { total: result.total }
    });
  }
}

export const borrowController = new BorrowController(borrowService);

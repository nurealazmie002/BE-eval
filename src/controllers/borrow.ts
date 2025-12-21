import { Request, Response } from 'express';
import { BorrowService } from '../services/borrow';
import { successResponse } from '../utils/response.helper';
import { AuthRequest } from '../middlewares/auth';

const borrowService = new BorrowService();

export class BorrowController {
  async getAllBorrowRecords(req: Request, res: Response) {
    const result = await borrowService.getAllBorrowRecords(req.query);
    return successResponse({ 
      res, 
      message: 'Daftar peminjaman', 
      data: result.borrowRecords, 
      search_result: { total: result.total } 
    });
  }

  async getBorrowRecordById(req: Request, res: Response) {
    const borrowRecord = await borrowService.getBorrowRecordById(req.params.id);
    return successResponse({ res, message: 'Detail peminjaman', data: borrowRecord });
  }

  async borrowBooks(req: AuthRequest, res: Response) {
    const data = {
      ...req.body,
      memberId: req.user?.id
    };
    const newBorrowRecord = await borrowService.borrowBooks(data);
    return successResponse({ 
      res, 
      statusCode: 201, 
      message: 'Peminjaman berhasil dibuat. Stok buku telah dikurangi.', 
      data: newBorrowRecord 
    });
  }

  async returnBooks(req: Request, res: Response) {
    const returnedRecord = await borrowService.returnBooks(req.params.id);
    return successResponse({ 
      res, 
      message: 'Buku berhasil dikembalikan. Stok buku telah ditambahkan kembali.', 
      data: returnedRecord 
    });
  }

  async deleteBorrowRecord(req: Request, res: Response) {
    const deletedRecord = await borrowService.deleteBorrowRecord(req.params.id);
    return successResponse({ 
      res, 
      message: 'Data peminjaman berhasil dihapus (Soft Delete)', 
      data: deletedRecord 
    });
  }

  async getMyBorrowings(req: AuthRequest, res: Response) {
    const memberId = req.user?.id;
    if (!memberId) {
      return res.status(401).json({ success: false, message: 'User tidak terautentikasi' });
    }
    const result = await borrowService.getMyBorrowings(memberId);
    return successResponse({ 
      res, 
      message: 'Riwayat peminjaman saya', 
      data: result.borrowRecords,
      search_result: { total: result.total }
    });
  }
}

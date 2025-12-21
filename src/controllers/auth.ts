import { Response } from 'express';
import { AuthService } from '../services/auth';
import { AuthRequest } from '../middlewares/auth';

const authService = new AuthService();

export class AuthController {
  async register(req: AuthRequest, res: Response) {
    const result = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      data: result
    });
  }

  async login(req: AuthRequest, res: Response) {
    const result = await authService.login(req.body);

    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      data: result
    });
  }

  async getProfile(req: AuthRequest, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User tidak terautentikasi'
      });
      return;
    }

    const profile = await authService.getProfile(userId);

    res.status(200).json({
      success: true,
      message: 'Profile berhasil diambil',
      data: profile
    });
  }
}

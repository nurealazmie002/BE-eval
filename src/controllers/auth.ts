import { Response } from 'express';
import { AuthService } from '../services/auth.js';
import { AuthRequest } from '../middlewares/auth.js';
import { MemberRepository } from '../repositories/member.repository.js';

const memberRepository = new MemberRepository();
const authService = new AuthService(memberRepository);

export class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async register(req: AuthRequest, res: Response) {
    const result = await this.authService.register(req.body);

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      data: result
    });
  }

  public async login(req: AuthRequest, res: Response) {
    const result = await this.authService.login(req.body);

    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      data: result
    });
  }

  public async getProfile(req: AuthRequest, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User tidak terautentikasi'
      });
      return;
    }

    const profile = await this.authService.getProfile(userId);

    res.status(200).json({
      success: true,
      message: 'Profile berhasil diambil',
      data: profile
    });
  }
}

export const authController = new AuthController(authService);

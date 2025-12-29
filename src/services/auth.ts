import { MemberRepository } from "../repositories/member.repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SALT_ROUNDS = 10;

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  role?: 'MEMBER' | 'ADMIN';
}

interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  private readonly memberRepository: MemberRepository;

  constructor(memberRepository: MemberRepository) {
    this.memberRepository = memberRepository;
  }

  public async register(data: RegisterData) {
    const existing = await this.memberRepository.findByEmail(data.email);

    if (existing) {
      throw { statusCode: 400, message: 'Email sudah terdaftar' };
    }

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const member = await this.memberRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone || null,
      address: data.address || null,
      role: data.role || 'MEMBER',
      status: 'ACTIVE'
    });

    const token = this.generateToken({
      id: member.id,
      email: member.email,
      role: member.role
    });

    return { 
      member: {
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role,
        status: member.status,
        createdAt: member.createdAt
      }, 
      token 
    };
  }

  public async login(data: LoginData) {
    const member = await this.memberRepository.findFirst(
      { email: data.email, deletedAt: null }
    );

    if (!member) {
      throw { statusCode: 401, message: 'Email atau password salah' };
    }

    const isValidPassword = await bcrypt.compare(data.password, member.password);

    if (!isValidPassword) {
      throw { statusCode: 401, message: 'Email atau password salah' };
    }

    if (member.status !== 'ACTIVE') {
      throw { statusCode: 403, message: 'Akun tidak aktif. Hubungi administrator.' };
    }

    const token = this.generateToken({
      id: member.id,
      email: member.email,
      role: member.role
    });

    return {
      member: {
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role,
        status: member.status
      },
      token
    };
  }

  public async getProfile(userId: string) {
    const member = await this.memberRepository.findById(userId);

    if (!member) {
      throw { statusCode: 404, message: 'User tidak ditemukan' };
    }

    return {
      id: member.id,
      name: member.name,
      email: member.email,
      phone: member.phone,
      address: member.address,
      role: member.role,
      status: member.status,
      createdAt: member.createdAt
    };
  }

  private generateToken(user: { id: string; email: string; role: string }) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
  }
}

import request from 'supertest';
import { app, prisma } from '../app';

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      const testEmail = `logintest_${Date.now()}@example.com`;
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Login Test User',
          email: testEmail,
          password: 'password123'
        });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testEmail,
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('token');
    });

    it('should return 401 with invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it('should return 401 with non-existent email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'notexist@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it('should return 400 when email is missing', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          password: 'password123'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/register', () => {
    const uniqueEmail = `test_${Date.now()}@example.com`;

    it('should register successfully with valid data', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: uniqueEmail,
          password: 'password123',
          phone: '08123456789',
          address: 'Jl. Test No. 123'
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('member');
      expect(response.body.data.member.email).toBe(uniqueEmail);
    });

    it('should return error when email already exists', async () => {
      const email = `duplicate_${Date.now()}@example.com`;
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'First User',
          email: email,
          password: 'password123'
        });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Second User',
          email: email,
          password: 'password123'
        });

      expect(response.body.success).toBe(false);
    });

    it('should return 400 when required fields are missing', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'incomplete@example.com'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});

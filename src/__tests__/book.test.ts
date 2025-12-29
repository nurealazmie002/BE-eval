import request from 'supertest';
import { app, prisma } from '../app';

describe('Book Endpoints', () => {
  let adminToken: string;
  let memberToken: string;
  let testCategoryId: string;
  let createdBookId: string;

  beforeAll(async () => {
    await prisma.$connect();

    const adminLogin = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@perpustakaan.com',
        password: 'admin123'
      });
    adminToken = adminLogin.body.data?.token;

    const categories = await prisma.category.findMany({
      where: { deletedAt: null },
      take: 1
    });

    if (categories.length > 0) {
      testCategoryId = categories[0].id;
    }
  });

  afterAll(async () => {
    if (createdBookId) {
      await prisma.book.update({
        where: { id: createdBookId },
        data: { deletedAt: new Date() }
      });
    }
    await prisma.$disconnect();
  });

  describe('POST /api/books (Create Book)', () => {
    it('should create book successfully with valid data (Admin)', async () => {
      if (!adminToken || !testCategoryId) {
        console.log('Skipping test: Admin token or category not available');
        return;
      }

      const response = await request(app)
        .post('/api/books')
        .set('Authorization', `Bearer ${adminToken}`)
        .field('judul', 'Test Book ' + Date.now())
        .field('penulis', 'Test Author')
        .field('penerbit', 'Test Publisher')
        .field('tahun_terbit', '2024')
        .field('stok', '5')
        .field('categoryId', testCategoryId);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('title');
      
      createdBookId = response.body.data.id;
    });

    it('should return 400 when categoryId is missing', async () => {
      if (!adminToken) {
        console.log('Skipping test: Admin token not available');
        return;
      }

      const response = await request(app)
        .post('/api/books')
        .set('Authorization', `Bearer ${adminToken}`)
        .field('judul', 'Incomplete Book')
        .field('penulis', 'Test Author')
        .field('penerbit', 'Test Publisher')
        .field('tahun_terbit', '2024')
        .field('stok', '5');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should return 401 when no token provided', async () => {
      const response = await request(app)
        .post('/api/books')
        .field('judul', 'Unauthorized Book')
        .field('penulis', 'Test Author')
        .field('penerbit', 'Test Publisher')
        .field('tahun_terbit', '2024')
        .field('stok', '5')
        .field('categoryId', testCategoryId || 'test-id');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/books (Get All Books with Filters)', () => {
    it('should get books with pagination', async () => {
      if (!adminToken) {
        console.log('Skipping test: Admin token not available');
        return;
      }

      const response = await request(app)
        .get('/api/books')
        .set('Authorization', `Bearer ${adminToken}`)
        .query({ page: 1, limit: 10 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('books');
      expect(response.body.data).toHaveProperty('pagination');
      expect(Array.isArray(response.body.data.books)).toBe(true);
    });

    it('should filter books by stock availability', async () => {
      if (!adminToken) {
        console.log('Skipping test: Admin token not available');
        return;
      }

      const response = await request(app)
        .get('/api/books')
        .set('Authorization', `Bearer ${adminToken}`)
        .query({ inStock: 'true' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.filters.inStock).toBe('true');
    });

    it('should filter books by publication year range', async () => {
      if (!adminToken) {
        console.log('Skipping test: Admin token not available');
        return;
      }

      const response = await request(app)
        .get('/api/books')
        .set('Authorization', `Bearer ${adminToken}`)
        .query({ min_tahun: 2000, max_tahun: 2024 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.filters.min_tahun).toBe('2000');
      expect(response.body.data.filters.max_tahun).toBe('2024');
    });
  });
});

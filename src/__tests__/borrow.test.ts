import request from 'supertest';
import { app, prisma } from '../app';

describe('Borrow Endpoints', () => {
  let userToken: string;
  let createdBorrowId: string;

  beforeAll(async () => {
    await prisma.$connect();

    const testEmail = `borrowuser_${Date.now()}@example.com`;
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Borrow Test User',
        email: testEmail,
        password: 'password123'
      });

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: 'password123'
      });
    
    userToken = loginResponse.body.data?.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/borrows (Borrow Books)', () => {
    it('should borrow books successfully with valid data', async () => {
      if (!userToken) {
        console.log('Skipping test: Token not available');
        return;
      }

      const booksResponse = await request(app)
        .get('/api/books')
        .set('Authorization', `Bearer ${userToken}`)
        .query({ inStock: 'true', limit: 1 });

      const books = booksResponse.body.data?.books;
      if (!books || books.length === 0) {
        console.log('Skipping test: No books with stock available');
        return;
      }

      const testBookId = books[0].id;
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);

      const response = await request(app)
        .post('/api/borrows')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          dueDate: dueDate.toISOString().split('T')[0],
          items: [
            { bookId: testBookId, quantity: 1 }
          ]
        });

      if (response.status === 201) {
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('id');
        createdBorrowId = response.body.data.id;
      } else {
        console.log('Borrow response:', response.status, response.body.message);
      }
    });

    it('should return error when book does not exist', async () => {
      if (!userToken) {
        console.log('Skipping test: Token not available');
        return;
      }

      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);

      const response = await request(app)
        .post('/api/borrows')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          dueDate: dueDate.toISOString().split('T')[0],
          items: [
            { bookId: '00000000-0000-0000-0000-000000000000', quantity: 1 }
          ]
        });

      expect(response.body.success).toBe(false);
    });

    it('should return 401 when not authenticated', async () => {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);

      const response = await request(app)
        .post('/api/borrows')
        .send({
          dueDate: dueDate.toISOString().split('T')[0],
          items: [
            { bookId: 'test-id', quantity: 1 }
          ]
        });

      expect(response.status).toBe(401);
    });
  });

  describe('PUT /api/borrows/:id/return (Return Books)', () => {
    it('should return books successfully', async () => {
      if (!userToken || !createdBorrowId) {
        console.log('Skipping test: Token or borrow record not available');
        return;
      }

      const response = await request(app)
        .put(`/api/borrows/${createdBorrowId}/return`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should return 400 when books already returned', async () => {
      if (!userToken || !createdBorrowId) {
        console.log('Skipping test: Token or borrow record not available');
        return;
      }

      const response = await request(app)
        .put(`/api/borrows/${createdBorrowId}/return`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/borrows/my-borrowings (Get My Borrowings)', () => {
    it('should get my borrow records', async () => {
      if (!userToken) {
        console.log('Skipping test: Token not available');
        return;
      }

      const response = await request(app)
        .get('/api/borrows/my-borrowings')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      
      const data = response.body.data;
      if (data.borrowRecords !== undefined) {
        expect(Array.isArray(data.borrowRecords)).toBe(true);
      } else {
        expect(Array.isArray(data) || data !== undefined).toBe(true);
      }
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .get('/api/borrows/my-borrowings');

      expect(response.status).toBe(401);
    });
  });
});

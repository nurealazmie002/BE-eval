import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Perpustakaan API',
      version: '1.0.0',
      description: 'API Documentation for Library Management System with JWT Authentication and RBAC',
      contact: {
        name: 'API Support',
        email: 'support@perpustakaan.com'
      }
    },
    servers: [
      {
        url: `${baseUrl}/api`,
        description: process.env.NODE_ENV === 'production' ? 'Production Server' : 'Development Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message' }
          }
        },
        ValidationError: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Validation error' },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        Member: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            phone: { type: 'string', example: '08123456789' },
            address: { type: 'string', example: 'Jl. Example No. 123' },
            role: { type: 'string', enum: ['MEMBER', 'ADMIN'] },
            status: { type: 'string', enum: ['ACTIVE', 'INACTIVE'] },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Category: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', example: 'Fiksi' },
            description: { type: 'string', example: 'Buku fiksi dan novel' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Book: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            title: { type: 'string', example: 'Harry Potter' },
            author: { type: 'string', example: 'J.K. Rowling' },
            publisher: { type: 'string', example: 'Gramedia' },
            publicationYear: { type: 'integer', example: 1997 },
            stock: { type: 'integer', example: 10 },
            coverImage: { type: 'string', nullable: true },
            categoryId: { type: 'string', format: 'uuid' },
            category: { $ref: '#/components/schemas/Category' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        BorrowRecord: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            memberId: { type: 'string', format: 'uuid' },
            borrowDate: { type: 'string', format: 'date-time' },
            dueDate: { type: 'string', format: 'date-time' },
            returnDate: { type: 'string', format: 'date-time', nullable: true },
            status: { type: 'string', enum: ['BORROWED', 'RETURNED', 'OVERDUE'] },
            member: { $ref: '#/components/schemas/Member' },
            items: {
              type: 'array',
              items: { $ref: '#/components/schemas/BorrowItem' }
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        BorrowItem: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            bookId: { type: 'string', format: 'uuid' },
            quantity: { type: 'integer', example: 1 },
            book: { $ref: '#/components/schemas/Book' }
          }
        },
        AdminStats: {
          type: 'object',
          properties: {
            totalBooks: { type: 'integer', example: 50 },
            totalAvailableBooks: { type: 'integer', example: 45 },
            totalMembers: { type: 'integer', example: 100 },
            totalBorrowRecords: { type: 'integer', example: 200 },
            activeBorrowings: { type: 'integer', example: 15 },
            mostPopularBook: {
              type: 'object',
              nullable: true,
              properties: {
                id: { type: 'string', format: 'uuid' },
                title: { type: 'string' },
                author: { type: 'string' },
                borrowCount: { type: 'integer' }
              }
            }
          }
        },
        Pagination: {
          type: 'object',
          properties: {
            page: { type: 'integer', example: 1 },
            limit: { type: 'integer', example: 10 },
            total: { type: 'integer', example: 100 },
            totalPages: { type: 'integer', example: 10 },
            hasNext: { type: 'boolean', example: true },
            hasPrev: { type: 'boolean', example: false }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Perpustakaan API Docs'
  }));

  app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

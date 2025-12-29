import { Router } from 'express';
import { bookController } from '../controllers/book.js';
import { asyncHandler } from '../utils/async.handler.js'; 
import { authenticate, adminOnly } from '../middlewares/auth.js';
import { uploadCover } from '../middlewares/upload.js';

const router = Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books with filters and pagination
 *     description: Retrieve a list of books with support for search, filtering, sorting and pagination.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page (max 100)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title or author
 *       - in: query
 *         name: kategori
 *         schema:
 *           type: string
 *         description: Filter by category name
 *       - in: query
 *         name: categories
 *         schema:
 *           type: string
 *         description: Comma-separated category IDs for multiple category filter
 *       - in: query
 *         name: inStock
 *         schema:
 *           type: string
 *           enum: ['true', 'false']
 *         description: Filter by stock availability (true = has stock, false = no stock)
 *       - in: query
 *         name: min_tahun
 *         schema:
 *           type: integer
 *         description: Minimum publication year
 *       - in: query
 *         name: max_tahun
 *         schema:
 *           type: integer
 *         description: Maximum publication year
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [title, author, publicationYear, stock, createdAt]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     books:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Book'
 *                     pagination:
 *                       $ref: '#/components/schemas/Pagination'
 *                     filters:
 *                       type: object
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', authenticate, asyncHandler(bookController.getAllBooks.bind(bookController)));

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get book by ID
 *     description: Retrieve a single book by its ID.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', authenticate, asyncHandler(bookController.getBookById.bind(bookController)));

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book (Admin only)
 *     description: Add a new book to the library. Requires admin role.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [judul, penulis, penerbit, tahun_terbit, stok, categoryId]
 *             properties:
 *               judul:
 *                 type: string
 *                 example: "Harry Potter"
 *               penulis:
 *                 type: string
 *                 example: "J.K. Rowling"
 *               penerbit:
 *                 type: string
 *                 example: "Gramedia"
 *               tahun_terbit:
 *                 type: integer
 *                 example: 1997
 *               stok:
 *                 type: integer
 *                 example: 10
 *               categoryId:
 *                 type: string
 *                 format: uuid
 *               cover:
 *                 type: string
 *                 format: binary
 *                 description: Book cover image (optional)
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Buku berhasil ditambahkan"
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', authenticate, adminOnly, uploadCover.single('cover'), asyncHandler(bookController.createBook.bind(bookController)));

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book (Admin only)
 *     description: Update an existing book. Requires admin role.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               judul:
 *                 type: string
 *               penulis:
 *                 type: string
 *               penerbit:
 *                 type: string
 *               tahun_terbit:
 *                 type: integer
 *               stok:
 *                 type: integer
 *               categoryId:
 *                 type: string
 *                 format: uuid
 *               cover:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Buku berhasil diupdate"
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', authenticate, adminOnly, uploadCover.single('cover'), asyncHandler(bookController.updateBook.bind(bookController)));

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book (Admin only)
 *     description: Soft delete a book. Requires admin role.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Buku berhasil dihapus"
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', authenticate, adminOnly, asyncHandler(bookController.deleteBook.bind(bookController)));

export default router;
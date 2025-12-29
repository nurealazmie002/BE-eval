# Perpustakaan API

REST API untuk Sistem Manajemen Perpustakaan dengan JWT Authentication dan RBAC.

## 🌐 Live API

- **Base URL:** https://be-eval-production.up.railway.app/api
- **API Docs:** https://be-eval-production.up.railway.app/api-docs

## Tech Stack

- Node.js v20+
- Express.js 5.x
- TypeScript 5.x
- Prisma ORM 7.x
- PostgreSQL

## Fitur

- JWT Authentication
- Role-Based Access Control (Admin & Member)
- Manajemen Buku (CRUD + Upload Cover)
- Manajemen Kategori
- Sistem Peminjaman Buku
- Search, Filter & Pagination
- Soft Delete
- Swagger Documentation

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Start development server
npm run dev
```

Server berjalan di `http://localhost:3000`

## Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/perpustakaan_db"
JWT_SECRET="your-secret-key"
PORT=3000
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile (Auth required)

### Books
- `GET /api/books` - List buku (filter: search, kategori, inStock, min_tahun, max_tahun)
- `GET /api/books/:id` - Detail buku
- `POST /api/books` - Tambah buku (Admin)
- `PUT /api/books/:id` - Update buku (Admin)
- `DELETE /api/books/:id` - Hapus buku (Admin)

### Categories
- `GET /api/categories` - List kategori
- `POST /api/categories` - Tambah kategori (Admin)
- `PUT /api/categories/:id` - Update kategori (Admin)
- `DELETE /api/categories/:id` - Hapus kategori (Admin)

### Members
- `GET /api/members` - List members (Admin)
- `POST /api/members` - Tambah member (Admin)

### Borrowing
- `GET /api/borrows/my-borrowings` - Riwayat peminjaman saya
- `GET /api/borrows` - List semua peminjaman (Admin)
- `POST /api/borrows` - Pinjam buku
- `PUT /api/borrows/:id/return` - Kembalikan buku

### Admin Stats
- `GET /api/admin/stats` - Statistik perpustakaan (Admin)

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Compile TypeScript |
| `npm start` | Start production server |
| `npm test` | Run unit tests |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Run database migrations |

## Testing

```bash
npm test
```

20 test cases covering Auth, Book, and Borrow endpoints.

## License

MIT
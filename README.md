# 📚 Perpustakaan API

REST API untuk sistem manajemen perpustakaan dengan fitur autentikasi JWT, Role-Based Access Control (RBAC), dan arsitektur 3-layer (Repository - Service - Controller).

## ✨ Fitur Utama

- 🔐 **Autentikasi JWT** - Login, Register, Profile
- 👥 **RBAC (Role-Based Access Control)** - Admin & Member roles
- 📚 **Manajemen Buku** - CRUD lengkap dengan upload cover
- 📂 **Manajemen Kategori** - CRUD lengkap
- 👤 **Manajemen Member** - CRUD lengkap (Admin only)
- 📖 **Peminjaman Buku** - Pinjam, Kembalikan, Riwayat
- 🔍 **Search, Pagination & Sorting** - Filter data dengan mudah
- 🗑️ **Soft Delete** - Data tidak hilang permanen
- ✅ **Validasi Input** - Express Validator
- 📁 **File Upload** - Upload cover buku

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| **Node.js** | JavaScript runtime |
| **Express 5** | Web framework |
| **TypeScript** | Type safety |
| **Prisma ORM** | Database ORM |
| **PostgreSQL** | Database |
| **JWT** | Authentication |
| **Multer** | File upload |
| **Express Validator** | Input validation |

## 📁 Struktur Project

```
src/
├── app.ts                 # Express app setup
├── prisma.ts              # Prisma client instance
├── controllers/           # Handle request & response
│   ├── auth.ts
│   ├── book.ts
│   ├── borrow.ts
│   ├── category.ts
│   └── member.ts
├── services/              # Business logic
│   ├── auth.ts
│   ├── book.ts
│   ├── borrow.ts
│   ├── category.ts
│   └── member.ts
├── repositories/          # Database access layer
│   ├── book.repository.ts
│   ├── borrow.repository.ts
│   ├── category.repository.ts
│   └── member.repository.ts
├── routes/                # API routes
│   ├── index.ts
│   ├── auth.ts
│   ├── book.ts
│   ├── borrow.ts
│   ├── category.ts
│   └── member.ts
├── middlewares/           # Custom middleware
│   ├── auth.ts            # JWT authentication
│   ├── errorHandler.ts    # Global error handler
│   ├── upload.ts          # File upload with Multer
│   ├── validate.ts        # Validation middleware
│   ├── requestId.ts       # Request ID generator
│   └── requestTimer.ts    # Request timer
├── validations/           # Input validation rules
│   ├── auth.ts
│   ├── book.ts
│   ├── borrow.ts
│   ├── category.ts
│   └── member.ts
├── utils/                 # Helper functions
│   ├── async.handler.ts
│   └── response.helper.ts
├── prisma/                # Prisma schema files
│   └── schema/
│       ├── book.prisma
│       ├── borrow_item.prisma
│       ├── borrow_record.prisma
│       ├── category.prisma
│       └── member.prisma
└── generated/             # Prisma generated client
```

## 🚀 Cara Install

### Prerequisites
- Node.js v18+
- PostgreSQL
- npm atau yarn

### Installation

```bash
# Clone repo
git clone <your-repo-url>
cd BE-eval

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env dengan konfigurasi database Anda

# Generate Prisma Client
npm run prisma:generate

# Jalankan migrasi database
npm run prisma:migrate

# Jalankan server development
npm run dev
```

Server akan jalan di `http://localhost:3000`

## ⚙️ Environment Variables

Buat file `.env` di root project:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/perpustakaan"

# JWT
JWT_SECRET="your-super-secret-key"

# Server
PORT=3000
```

## 📡 API Endpoints

### Auth
| Method | Endpoint | Auth | Role | Keterangan |
|--------|----------|------|------|------------|
| POST | `/api/auth/register` | ❌ | - | Register user baru |
| POST | `/api/auth/login` | ❌ | - | Login user |
| GET | `/api/auth/profile` | ✅ | Any | Ambil profile user |

### Categories
| Method | Endpoint | Auth | Role | Keterangan |
|--------|----------|------|------|------------|
| GET | `/api/categories` | ✅ | Any | Ambil semua kategori |
| GET | `/api/categories/:id` | ✅ | Any | Ambil kategori by ID |
| POST | `/api/categories` | ✅ | Admin | Tambah kategori baru |
| PUT | `/api/categories/:id` | ✅ | Admin | Update kategori |
| DELETE | `/api/categories/:id` | ✅ | Admin | Hapus kategori |

### Books
| Method | Endpoint | Auth | Role | Keterangan |
|--------|----------|------|------|------------|
| GET | `/api/books` | ✅ | Any | Ambil semua buku |
| GET | `/api/books/:id` | ✅ | Any | Ambil buku by ID |
| POST | `/api/books` | ✅ | Admin | Tambah buku baru |
| PUT | `/api/books/:id` | ✅ | Admin | Update buku |
| DELETE | `/api/books/:id` | ✅ | Admin | Hapus buku |

**Query Parameters:**
- `page` - Nomor halaman (default: 1)
- `limit` - Jumlah per halaman (default: 10)
- `search` - Cari berdasarkan judul/penulis
- `sortBy` - Field untuk sorting (default: title)
- `sortOrder` - asc/desc (default: asc)

### Members (Admin Only)
| Method | Endpoint | Auth | Role | Keterangan |
|--------|----------|------|------|------------|
| GET | `/api/members` | ✅ | Admin | Ambil semua member |
| GET | `/api/members/:id` | ✅ | Admin | Ambil member by ID |
| POST | `/api/members` | ✅ | Admin | Tambah member baru |
| PUT | `/api/members/:id` | ✅ | Admin | Update member |
| DELETE | `/api/members/:id` | ✅ | Admin | Hapus member |

### Borrowing
| Method | Endpoint | Auth | Role | Keterangan |
|--------|----------|------|------|------------|
| GET | `/api/borrows/my-borrowings` | ✅ | Any | Riwayat peminjaman saya |
| GET | `/api/borrows` | ✅ | Admin | Semua peminjaman |
| GET | `/api/borrows/:id` | ✅ | Any | Detail peminjaman |
| POST | `/api/borrows` | ✅ | Any | Pinjam buku |
| PUT | `/api/borrows/:id/return` | ✅ | Any | Kembalikan buku |
| DELETE | `/api/borrows/:id` | ✅ | Admin | Hapus record peminjaman |

## 📝 Contoh Request

### Register Admin
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Admin Perpustakaan",
  "email": "admin@perpustakaan.com",
  "password": "admin123",
  "role": "ADMIN"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@perpustakaan.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "name": "Admin Perpustakaan",
      "email": "admin@perpustakaan.com",
      "role": "ADMIN"
    }
  }
}
```

### Tambah Buku (dengan Cover)
```bash
POST /api/books
Authorization: Bearer <token>
Content-Type: multipart/form-data

judul: Harry Potter
penulis: J.K. Rowling
penerbit: Gramedia
tahun_terbit: 1997
stok: 10
categoryId: <category-uuid>
cover: <file>
```

### Pinjam Buku
```bash
POST /api/borrows
Authorization: Bearer <token>
Content-Type: application/json

{
  "dueDate": "2025-01-15",
  "items": [
    { "bookId": "book-uuid-1", "quantity": 1 },
    { "bookId": "book-uuid-2", "quantity": 1 }
  ]
}
```

## 🧪 Testing dengan Postman

1. Import file `postman_collection.json` ke Postman
2. Jalankan request **Register Admin** terlebih dahulu
3. Jalankan request **Login** - token akan otomatis tersimpan
4. Jalankan request lainnya sesuai kebutuhan

## 📜 Scripts

```bash
# Development
npm run dev          # Jalankan server dengan hot reload

# Database
npm run prisma:generate   # Generate Prisma Client
npm run prisma:migrate    # Jalankan migrasi
npm run prisma:reset      # Reset database

# Production
npm run build        # Compile TypeScript
npm start            # Jalankan production
```

## 🔧 Troubleshooting

**Port sudah digunakan?**
```bash
PORT=4000 npm run dev
```

**Database connection error?**
- Pastikan PostgreSQL sudah running
- Cek konfigurasi DATABASE_URL di `.env`

**Module not found?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 👤 Author

Dibuat untuk Final Project Backend Development

---

**Happy coding!** 🚀
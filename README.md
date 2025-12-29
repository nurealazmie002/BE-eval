<p align="center">
  <img src="https://img.icons8.com/color/96/000000/library.png" alt="Library Logo"/>
</p>

<h1 align="center">📚 Perpustakaan API</h1>

<p align="center">
  <strong>REST API untuk Sistem Manajemen Perpustakaan Modern</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Prisma-7.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/RBAC-Enabled-green?style=flat-square" alt="RBAC"/>
  <img src="https://img.shields.io/badge/3--Layer-Architecture-blue?style=flat-square" alt="3-Layer"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="License"/>
</p>

---

## 🌐 Live API

| Environment | URL |
|-------------|-----|
| **Base URL** | `https://YOUR-APP.up.railway.app/api` |
| **API Docs** | `https://YOUR-APP.up.railway.app/api-docs` |

> ⚠️ Ganti `YOUR-APP` dengan subdomain Railway kamu setelah deploy

---

## ✨ Fitur Utama

<table>
  <tr>
    <td align="center">🔐</td>
    <td><strong>JWT Authentication</strong><br/>Secure login dengan JSON Web Token</td>
    <td align="center">👥</td>
    <td><strong>Role-Based Access</strong><br/>Admin & Member permissions</td>
  </tr>
  <tr>
    <td align="center">📚</td>
    <td><strong>Manajemen Buku</strong><br/>CRUD lengkap + upload cover</td>
    <td align="center">📂</td>
    <td><strong>Manajemen Kategori</strong><br/>Organisasi buku by kategori</td>
  </tr>
  <tr>
    <td align="center">📖</td>
    <td><strong>Sistem Peminjaman</strong><br/>Pinjam, kembalikan, riwayat</td>
    <td align="center">🔍</td>
    <td><strong>Search & Filter</strong><br/>Pagination, sorting, search</td>
  </tr>
  <tr>
    <td align="center">🗑️</td>
    <td><strong>Soft Delete</strong><br/>Data aman tidak hilang</td>
    <td align="center">✅</td>
    <td><strong>Input Validation</strong><br/>Express Validator</td>
  </tr>
</table>

---

## 🏗️ Arsitektur

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT REQUEST                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      MIDDLEWARE LAYER                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐│
│  │   Auth   │ │ Validate │ │  Upload  │ │  Error Handler   ││
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘│
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     CONTROLLER LAYER                         │
│           Handle HTTP Request & Response                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      SERVICE LAYER                           │
│              Business Logic & Validations                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    REPOSITORY LAYER                          │
│               Database Access via Prisma                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       POSTGRESQL                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Struktur Project

```
src/
├── 📄 app.ts                 # Express app entry point
├── 📄 prisma.ts              # Prisma client instance
│
├── 📂 controllers/           # Handle HTTP request/response
│   ├── auth.ts
│   ├── book.ts
│   ├── borrow.ts
│   ├── category.ts
│   └── member.ts
│
├── 📂 services/              # Business logic layer
│   ├── auth.ts
│   ├── book.ts
│   ├── borrow.ts
│   ├── category.ts
│   └── member.ts
│
├── 📂 repositories/          # Database access layer
│   ├── book.repository.ts
│   ├── borrow.repository.ts
│   ├── category.repository.ts
│   └── member.repository.ts
│
├── 📂 routes/                # API route definitions
├── 📂 middlewares/           # Custom middlewares
├── 📂 validations/           # Input validation rules
├── 📂 utils/                 # Helper functions
├── 📂 prisma/                # Prisma schema files
└── 📂 generated/             # Prisma generated client
```

---

## 🚀 Quick Start

### Prerequisites

- ![Node.js](https://img.shields.io/badge/-Node.js_v18+-339933?style=flat-square&logo=node.js&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
- ![npm](https://img.shields.io/badge/-npm-CB3837?style=flat-square&logo=npm&logoColor=white)

### Installation

```bash
# 1️⃣ Clone repository
git clone <your-repo-url>
cd BE-eval

# 2️⃣ Install dependencies
npm install

# 3️⃣ Setup environment
cp .env.example .env
# Edit .env dengan konfigurasi Anda

# 4️⃣ Generate Prisma Client
npm run prisma:generate

# 5️⃣ Run database migration
npm run prisma:migrate

# 6️⃣ Start development server
npm run dev
```

> 🎉 Server berjalan di `http://localhost:3000`

---

## ⚙️ Environment Variables

```env
# 🗄️ Database
DATABASE_URL="postgresql://user:password@localhost:5432/perpustakaan"

# 🔐 JWT Secret
JWT_SECRET="your-super-secret-key-here"

# 🌐 Server
PORT=3000
```

---

## 📡 API Reference

### 🔐 Authentication

| Method | Endpoint | Auth | Description |
|:------:|----------|:----:|-------------|
| `POST` | `/api/auth/register` | ❌ | Register user baru |
| `POST` | `/api/auth/login` | ❌ | Login user |
| `GET` | `/api/auth/profile` | ✅ | Get current user profile |

### 📂 Categories

| Method | Endpoint | Auth | Role | Description |
|:------:|----------|:----:|:----:|-------------|
| `GET` | `/api/categories` | ✅ | Any | List semua kategori |
| `GET` | `/api/categories/:id` | ✅ | Any | Detail kategori |
| `POST` | `/api/categories` | ✅ | 👑 | Tambah kategori |
| `PUT` | `/api/categories/:id` | ✅ | 👑 | Update kategori |
| `DELETE` | `/api/categories/:id` | ✅ | 👑 | Hapus kategori |

### 📚 Books

| Method | Endpoint | Auth | Role | Description |
|:------:|----------|:----:|:----:|-------------|
| `GET` | `/api/books` | ✅ | Any | List semua buku |
| `GET` | `/api/books/:id` | ✅ | Any | Detail buku |
| `POST` | `/api/books` | ✅ | 👑 | Tambah buku |
| `PUT` | `/api/books/:id` | ✅ | 👑 | Update buku |
| `DELETE` | `/api/books/:id` | ✅ | 👑 | Hapus buku |

<details>
<summary>📋 Query Parameters</summary>

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Nomor halaman |
| `limit` | number | 10 | Jumlah per halaman |
| `search` | string | - | Cari judul/penulis |
| `sortBy` | string | title | Field untuk sorting |
| `sortOrder` | string | asc | asc atau desc |

</details>

### 👤 Members (Admin Only)

| Method | Endpoint | Auth | Role | Description |
|:------:|----------|:----:|:----:|-------------|
| `GET` | `/api/members` | ✅ | 👑 | List semua member |
| `GET` | `/api/members/:id` | ✅ | 👑 | Detail member |
| `POST` | `/api/members` | ✅ | 👑 | Tambah member |
| `PUT` | `/api/members/:id` | ✅ | 👑 | Update member |
| `DELETE` | `/api/members/:id` | ✅ | 👑 | Hapus member |

### 📖 Borrowing

| Method | Endpoint | Auth | Role | Description |
|:------:|----------|:----:|:----:|-------------|
| `GET` | `/api/borrows/my-borrowings` | ✅ | Any | Riwayat peminjaman saya |
| `GET` | `/api/borrows` | ✅ | 👑 | List semua peminjaman |
| `GET` | `/api/borrows/:id` | ✅ | Any | Detail peminjaman |
| `POST` | `/api/borrows` | ✅ | Any | Pinjam buku |
| `PUT` | `/api/borrows/:id/return` | ✅ | Any | Kembalikan buku |
| `DELETE` | `/api/borrows/:id` | ✅ | 👑 | Hapus record |

> 👑 = Admin only | ✅ = Authenticated | ❌ = Public

---

## 📝 Example Requests

<details>
<summary><strong>🔐 Register Admin</strong></summary>

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Admin Perpustakaan",
  "email": "admin@perpustakaan.com",
  "password": "admin123",
  "role": "ADMIN"
}
```
</details>

<details>
<summary><strong>🔑 Login</strong></summary>

```http
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
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "name": "Admin Perpustakaan",
      "email": "admin@perpustakaan.com",
      "role": "ADMIN"
    }
  }
}
```
</details>

<details>
<summary><strong>📚 Create Book (with Cover)</strong></summary>

```http
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
</details>

<details>
<summary><strong>📖 Borrow Books</strong></summary>

```http
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
</details>

---

## 🧪 Testing dengan Postman

1. **Import** file `postman_collection.json` ke Postman
2. **Jalankan** request `Register Admin`
3. **Jalankan** request `Login` → Token otomatis tersimpan
4. **Test** endpoint lainnya! 🎉

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Compile TypeScript |
| `npm start` | Start production server |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:reset` | Reset database |

---

## 🔧 Troubleshooting

<details>
<summary><strong>❌ Port sudah digunakan</strong></summary>

```bash
PORT=4000 npm run dev
```
</details>

<details>
<summary><strong>❌ Database connection error</strong></summary>

- Pastikan PostgreSQL sudah running
- Cek konfigurasi `DATABASE_URL` di `.env`
</details>

<details>
<summary><strong>❌ Module not found</strong></summary>

```bash
rm -rf node_modules package-lock.json
npm install
```
</details>

---

<p align="center">
  <strong>Made with ❤️ for Backend Development Final Project</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Happy-Coding!-ff69b4?style=for-the-badge" alt="Happy Coding"/>
</p>
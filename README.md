# 📚 Perpustakaan API

API sederhana untuk manajemen perpustakaan. Project ini dibuat sebagai tugas evaluasi minggu pertama bootcamp backend development.

## Fitur Utama

- Manajemen Buku (CRUD lengkap)
- Manajemen Member (CRUD lengkap)
- Pencarian dan filter data
- Validasi input otomatis
- Error handling yang rapi

## Tech Stack

- **Node.js** + **Express** - Framework backend
- **TypeScript** - Type safety
- **Express Validator** - Validasi input

## Cara Install

```bash
# Clone repo
git clone <your-repo-url>
cd perpustakaan-api

# Install dependencies
npm install

# Jalankan server
npm run dev
```

Server akan jalan di `http://localhost:3000`

## API Endpoints

### Books (Buku)

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/api/books` | Ambil semua buku |
| GET | `/api/books/:id` | Ambil buku by ID |
| POST | `/api/books` | Tambah buku baru |
| PUT | `/api/books/:id` | Update buku |
| DELETE | `/api/books/:id` | Hapus buku |

**Contoh pencarian:**
- `/api/books?search=harry` - Cari buku dengan kata "harry"
- `/api/books?kategori=fiksi` - Filter buku kategori fiksi
- `/api/books?min_tahun=2000&max_tahun=2020` - Filter buku tahun 2000-2020

### Members (Anggota)

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/api/members` | Ambil semua member |
| GET | `/api/members/:id` | Ambil member by ID |
| POST | `/api/members` | Tambah member baru |
| PUT | `/api/members/:id` | Update member |
| DELETE | `/api/members/:id` | Hapus member |

**Contoh pencarian:**
- `/api/members?search=john` - Cari member dengan nama "john"
- `/api/members?status=active` - Filter member yang aktif

## Contoh Request

### Tambah Buku Baru

```bash
POST /api/books
Content-Type: application/json

{
  "judul": "Harry Potter dan Batu Bertuah",
  "penulis": "J.K. Rowling",
  "penerbit": "Gramedia",
  "tahun_terbit": 1997,
  "kategori": "fiksi",
  "stok": 5
}
```

**Response:**
```json
{
  "success": true,
  "message": "Buku berhasil ditambahkan",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "judul": "Harry Potter dan Batu Bertuah",
    "penulis": "J.K. Rowling",
    "penerbit": "Gramedia",
    "tahun_terbit": 1997,
    "kategori": "fiksi",
    "stok": 5
  }
}
```

### Tambah Member Baru

```bash
POST /api/members
Content-Type: application/json

{
  "nama": "John Doe",
  "email": "john@example.com",
  "telepon": "08123456789",
  "alamat": "Jl. Sudirman No. 123, Jakarta"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Member berhasil ditambahkan",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "nama": "John Doe",
    "email": "john@example.com",
    "telepon": "08123456789",
    "alamat": "Jl. Sudirman No. 123, Jakarta",
    "status": "active",
    "tanggal_daftar": "2024-12-06T10:30:00.000Z"
  }
}
```

## Testing dengan Postman

1. Import file `postman/Perpustakaan-API.postman_collection.json`
2. Jalankan request yang ada di collection
3. Done!

## Struktur Project

```
src/
├── controllers/      # Handle request & response
├── services/         # Business logic
├── routes/           # API routes
├── models/           # Data types
├── validations/      # Input validation rules
├── middlewares/      # Custom middleware
├── utils/            # Helper functions
└── app.ts            # Express app setup
```

## Fitur Tambahan

- **Request ID**: Setiap request punya unique ID di header `X-Request-ID`
- **Request Timer**: Waktu proses tiap request otomatis di-log ke console
- **Validasi Lengkap**: Semua input di-validasi sebelum di-proses
- **Error Handling**: Error ditangkap dan dikembalikan dalam format yang konsisten

## Catatan

- Data disimpan di memory (hilang saat server restart)
- Ada sample data buku dan member untuk testing
- Validasi kategori buku: `fiksi`, `non-fiksi`, `referensi`, `komik`, `majalah`
- Format telepon harus diawali `08`

## Build untuk Production

```bash
# Compile TypeScript
npm run build

# Jalankan production
npm start
```

## Troubleshooting

**Port sudah digunakan?**
```bash
PORT=4000 npm run dev
```

**Module not found?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Author

Dibuat dengan untuk Final Project Minggu 1

---

**Happy coding!** 
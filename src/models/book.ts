export interface Book {
  id: string;
  judul: string;
  penulis: string;
  penerbit: string;
  tahun_terbit: number;
  kategori: string;
  stok: number;
}

export interface CreateBookDTO {
  judul: string;
  penulis: string;
  penerbit: string;
  tahun_terbit: number;
  kategori: string;
  stok: number;
}

export interface UpdateBookDTO {
  judul?: string;
  penulis?: string;
  penerbit?: string;
  tahun_terbit?: number;
  kategori?: string;
  stok?: number;
}

export interface BookSearchParams {
  search?: string;
  kategori?: string;
  min_tahun?: number;
  max_tahun?: number;
}
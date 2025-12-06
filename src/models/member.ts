export interface Member {
  id: string;
  nama: string;
  email: string;
  telepon: string;
  alamat: string;
  status: 'active' | 'inactive';
  tanggal_daftar: Date;
}

export interface CreateMemberDTO {
  nama: string;
  email: string;
  telepon: string;
  alamat: string;
}

export interface UpdateMemberDTO {
  nama?: string;
  email?: string;
  telepon?: string;
  alamat?: string;
  status?: 'active' | 'inactive';
}

export interface MemberSearchParams {
  search?: string;
  status?: 'active' | 'inactive';
}
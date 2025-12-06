import { v4 as uuidv4 } from "uuid";
import {
  Member,
  CreateMemberDTO,
  UpdateMemberDTO,
  MemberSearchParams,
} from "../models/member";

let members: Member[] = [
  {
    id: uuidv4(),
    nama: "John Doe",
    email: "john@example.com",
    telepon: "08123456789",
    alamat: "Jl. Sudirman No. 123, Jakarta",
    status: "active",
    tanggal_daftar: new Date("2024-01-15"),
  },
  {
    id: uuidv4(),
    nama: "Jane Smith",
    email: "jane@example.com",
    telepon: "08198765432",
    alamat: "Jl. Gatot Subroto No. 45, Bandung",
    status: "active",
    tanggal_daftar: new Date("2024-03-20"),
  },
  {
    id: uuidv4(),
    nama: "Bob Wilson",
    email: "bob@example.com",
    telepon: "08567891234",
    alamat: "Jl. Ahmad Yani No. 78, Surabaya",
    status: "inactive",
    tanggal_daftar: new Date("2023-12-10"),
  },
];

export class MemberService {
  getAllMembers(params: MemberSearchParams) {
    let filteredMembers = [...members];

    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredMembers = filteredMembers.filter(
        (member) =>
          member.nama.toLowerCase().includes(searchLower) ||
          member.email.toLowerCase().includes(searchLower)
      );
    }

    if (params.status) {
      filteredMembers = filteredMembers.filter(
        (member) => member.status === params.status
      );
    }

    return {
      members: filteredMembers,
      total: filteredMembers.length,
      filters: {
        search: params.search,
        status: params.status,
      },
    };
  }

  getMemberById(id: string) {
    const member = members.find((m) => m.id === id);
    if (!member) {
      throw { statusCode: 404, message: "Member tidak ditemukan" };
    }
    return member;
  }

  createMember(data: CreateMemberDTO) {
    const existingMember = members.find((m) => m.email === data.email);
    if (existingMember) {
      throw { statusCode: 400, message: "Email sudah terdaftar" };
    }

    const newMember: Member = {
      id: uuidv4(),
      ...data,
      status: "active",
      tanggal_daftar: new Date(),
    };

    members.push(newMember);
    return newMember;
  }

  updateMember(id: string, data: UpdateMemberDTO) {
    const index = members.findIndex((m) => m.id === id);
    if (index === -1) {
      throw { statusCode: 404, message: "Member tidak ditemukan" };
    }

    if (data.email && data.email !== members[index].email) {
      const existingMember = members.find((m) => m.email === data.email);
      if (existingMember) {
        throw { statusCode: 400, message: "Email sudah terdaftar" };
      }
    }

    members[index] = {
      ...members[index],
      ...data,
    };

    return members[index];
  }

  deleteMember(id: string) {
    const index = members.findIndex((m) => m.id === id);
    if (index === -1) {
      throw { statusCode: 404, message: "Member tidak ditemukan" };
    }

    const deletedMember = members[index];
    members.splice(index, 1);
    return deletedMember;
  }
}

import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../core/entities/user.entity';
import { PrismaService } from 'prisma/prisma.service';
import { Role } from '@prisma/client';


@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const rows = await this.prisma.user.findMany();
    return rows.map(r => new UserEntity(r.id, r.name, r.email, undefined, r.role, r.createdAt, r.updatedAt));
  }

  async findById(id: string) {
    const r = await this.prisma.user.findUnique({ where: { id }});
    if (!r) return null;
    return new UserEntity(r.id, r.name, r.email, undefined, r.role, r.createdAt, r.updatedAt);
  }

  async findByEmail(email: string) {
    const r = await this.prisma.user.findUnique({ where: { email }});
    if (!r) return null;
    return r; // return raw for auth (we need password)
  }

  async create(data: { name: string; email: string; password: string; role?: Role }) {
    const r = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role ?? Role.USER,
      },
    });
    return new UserEntity(r.id, r.name, r.email, undefined, r.role, r.createdAt, r.updatedAt);
  }
}

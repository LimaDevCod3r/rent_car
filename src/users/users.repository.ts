import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateUserDto) {
    return this.prisma.user.create({
      data: payload,
    });
  }
  // pnpm i bcryptjs
  // pnpm i @types/bcryptjs -D

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}

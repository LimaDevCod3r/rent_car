import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserPayload } from 'src/auth/interfaces/user-payload.interface';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateUserDto) {
    return this.prisma.user.create({
      data: payload,
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string | UserPayload) {
    // Se o id for um objeto (UserPayload), extrair o sub como ID
    const userId = typeof id === 'object' ? id.sub : id;

    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}

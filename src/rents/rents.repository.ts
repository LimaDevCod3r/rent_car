import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRentDto } from './dto/create-rent.dto';

@Injectable()
export class RentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRentDto, userId: string) {
    const rent = await this.prisma.rent.create({
      data: {
        ...data,
        userId,
      },
    });

    // atualiza o carro para indisponível
    await this.prisma.car.update({
      where: {
        id: data.carId,
      },
      data: {
        available: false,
      },
    });

    return rent;
  }

  async rentCarDisponibility() {
    return await this.prisma.car.findFirst({
      where: {
        available: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.rent.findMany({
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        cars: {
          select: {
            id: true,
            name: true,
            model: true,
            year: true,
            price: true,
            image: true,
          },
        },
      },
    });
  }

  async countRents() {
    return await this.prisma.rent.count();
  }

  async countRentsByUser(userId: string) {
    return await this.prisma.rent.count({
      where: {
        userId: userId,
      },
    });
  }
}

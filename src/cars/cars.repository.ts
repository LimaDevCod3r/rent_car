import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCarDto, userId: string) {
    return this.prisma.car.create({
      data: {
        name: data.name,
        model: data.model,
        year: data.year,
        price: data.price,
        image: data.image,
        available: data.available ?? true,
        userId: userId,
      },
    });
  }

  async findAll() {
    return this.prisma.car.findMany();
  }

  async findOne(id: string) {
    return this.prisma.car.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateCarDto) {
    return await this.prisma.car.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.car.delete({
      where: {
        id,
      },
    });
  }
}

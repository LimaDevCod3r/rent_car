import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CloudinaryProvider } from 'src/providers/cloudinary.provider';
import { CarsRepository } from './cars.repository';

@Injectable()
export class CarsService {
  constructor(
    private readonly cloudinaryProvider: CloudinaryProvider,
    private readonly carsRepository: CarsRepository,
  ) {}

  async create(
    createCarDto: CreateCarDto,
    file: Express.Multer.File,
    userId: string,
  ) {
    // Se houver um arquivo, faz o upload para o Cloudinary
    if (file) {
      const imageUrl = await this.cloudinaryProvider.uploadImage(file);
      createCarDto.image = imageUrl;
    }
    // Cria o carro no banco de dados
    return this.carsRepository.create(createCarDto, userId);
  }

  findAll() {
    return this.carsRepository.findAll();
  }

  findOne(id: string) {
    return this.carsRepository.findOne(id);
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const cars = await this.carsRepository.findOne(id);
    if (!cars) {
      throw new NotFoundException('Carro não encontrado');
    }
    return await this.carsRepository.update(cars.id, updateCarDto);
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}

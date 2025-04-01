import { Injectable, NotFoundException } from '@nestjs/common';
import { RentsRepository } from './rents.repository';
import { CreateRentDto } from './dto/create-rent.dto';
import { CarsService } from 'src/cars/cars.service';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class RentsService {
  constructor(
    private readonly rentsRepository: RentsRepository,
    private readonly carsService: CarsService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createRentDto: CreateRentDto, userId: string) {
    const userExists = await this.usersRepository.findById(userId);
    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // verifica se o carro existe
    const carExists = await this.carsService.findOne(createRentDto.carId);

    if (!carExists) {
      throw new NotFoundException('Carro não encontrado');
    }

    // verifica se o carro está disponível
    const carAvailable = await this.rentsRepository.rentCarDisponibility();

    if (!carAvailable) {
      throw new NotFoundException('Carro não disponível');
    }

    return await this.rentsRepository.create(createRentDto, userId);
  }

  async findAll() {
    const rentsList = await this.rentsRepository.findAll();
    const totalRents = await this.rentsRepository.countRents();
    return {
      rentsList,
      totalRents,
    };
  }

  async countRentsByUser(userId: string) {
    const totalRents = await this.rentsRepository.countRentsByUser(userId);

    if (!totalRents) {
      return {
        message: 'Nenhum aluguel encontrado para este usuário',
        total: 0,
      };
    }

    return {
      message: 'Total de aluguéis encontrados',
      total: totalRents,
    };
  }
}

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RentsService } from './rents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateRentDto } from './dto/create-rent.dto';
import { UserPayload } from 'src/auth/interfaces/user-payload.interface';

@Controller('rents')
@UseGuards(JwtAuthGuard)
export class RentsController {
  constructor(private readonly rentsService: RentsService) {}

  @Post()
  async create(
    @CurrentUser() user: UserPayload,
    @Body() createRentDto: CreateRentDto,
  ) {
    const userId = user.sub;
    const rent = await this.rentsService.create(createRentDto, userId);

    return {
      message: 'Aluguel realizado com sucesso',
      rent,
    };
  }

  @Get()
  async findAll() {
    const rents = await this.rentsService.findAll();

    return {
      message: 'Aluguéis encontrados com sucesso',
      data: {
        total: rents.totalRents,
        rents: rents.rentsList.map((data) => ({
          id: data.id,
          startAt: data.startAt,
          endAt: data.endAt,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          car: {
            id: data.carId,
            name: data.cars.name,
            model: data.cars.model,
            year: data.cars.year,
            image: data.cars.image,
            price: data.cars.price,
          },
          user: {
            id: data.userId,
            name: data.users.name,
            email: data.users.email,
          },
        })),
      },
    };
  }

  @Get('count/user')
  @UseGuards(JwtAuthGuard)
  async countRentsByUser(@CurrentUser() user: UserPayload) {
    const userId = user.sub;
    return this.rentsService.countRentsByUser(userId);
  }
}

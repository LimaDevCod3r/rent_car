import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserPayload } from 'src/auth/interfaces/user-payload.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'node:path';
import { diskStorage } from 'multer';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @Body() createCarDto: CreateCarDto,
    @CurrentUser() { sub }: UserPayload,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const cars = await this.carsService.create(createCarDto, file, sub);
    return {
      message: 'Carro criado com sucesso',
      data: {
        cars,
      },
    };
  }

  @Get()
  async findAll() {
    const cars = await this.carsService.findAll();
    return {
      message: 'Carros encontrados com sucesso',
      data: {
        cars,
      },
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    const cars = this.carsService.update(id, updateCarDto);
    return {
      message: 'Carro atualizado com sucesso',
      data: {
        cars,
      },
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}

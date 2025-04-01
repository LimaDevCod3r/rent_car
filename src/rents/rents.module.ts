import { Module } from '@nestjs/common';
import { RentsController } from './rents.controller';
import { RentsService } from './rents.service';
import { RentsRepository } from './rents.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CarsModule } from 'src/cars/cars.module';
import { CarsService } from 'src/cars/cars.service';
import { CloudinaryProvider } from 'src/providers/cloudinary.provider';
import { CarsRepository } from 'src/cars/cars.repository';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  imports: [CarsModule],
  controllers: [RentsController],
  providers: [
    RentsService,
    RentsRepository,
    PrismaService,
    CarsService,
    CloudinaryProvider,
    CarsRepository,
    UsersRepository,
  ],
  exports: [RentsService],
})
export class RentsModule {}

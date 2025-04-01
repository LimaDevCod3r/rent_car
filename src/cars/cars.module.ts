import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { CloudinaryProvider } from 'src/providers/cloudinary.provider';
import { CarsRepository } from './cars.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService, CloudinaryProvider, CarsRepository, PrismaService],
  exports: [CarsService],
})
export class CarsModule {}

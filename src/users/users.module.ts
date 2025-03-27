import { Module } from '@nestjs/common';
import { CreateUsersService } from './create-users.service';
import { CreateUsersController } from './create-users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [CreateUsersController],
  providers: [CreateUsersService, PrismaService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}

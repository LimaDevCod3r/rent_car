import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUsersService } from './create-users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('auth')
export class CreateUsersController {
  constructor(private readonly usersService: CreateUsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body(new ValidationPipe()) payload: CreateUserDto) {
    const user = await this.usersService.execute(payload);

    return {
      message: 'usuário criado com sucesso',
      user,
    };
  }
}

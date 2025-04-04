import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async handle(@Body() payload: LoginDto) {
    return this.authService.execute(payload);
  }
}

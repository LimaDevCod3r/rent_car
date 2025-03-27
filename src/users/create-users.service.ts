import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class CreateUsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(payload: CreateUserDto) {
    // Verifica se o e-mail já está em uso
    const emailExists = await this.usersRepository.findByEmail(payload.email);

    if (emailExists) {
      throw new ConflictException('usuário já existe');
    }

    // Hash da senha antes de salvar no banco
    const hashedPassword = await hash(payload.password, 10);

    const user = await this.usersRepository.create({
      ...payload,
      password: hashedPassword,
    });

    // Retorna apenas os dados públicos
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}

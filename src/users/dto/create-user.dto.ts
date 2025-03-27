import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @MaxLength(50, { message: 'O nome deve ter no máximo 50 caracteres' })
  name: string;

  @IsEmail({}, { message: 'O email deve ser um email válido' })
  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  email: string;

  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  password: string;
}

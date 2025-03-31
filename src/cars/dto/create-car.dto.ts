import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  Min,
  Max,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateCarDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsString({ message: 'O modelo deve ser uma string' })
  @IsNotEmpty({ message: 'O modelo não pode ser vazio' })
  model: string;

  @IsOptional()
  @IsString({ message: 'A imagem deve ser uma URL válida' })
  image?: string;

  @IsNumber({}, { message: 'O preço deve ser um número' })
  @IsNotEmpty({ message: 'O preço não pode ser vazio' })
  @Min(0, { message: 'O preço não pode ser negativo' })
  @Transform(({ value }) => Number(value))
  price: number;

  @IsNumber({}, { message: 'O ano deve ser um número' })
  @IsNotEmpty({ message: 'O ano não pode ser vazio' })
  @Min(1900, { message: 'O ano não pode ser menor que 1900' })
  @Max(new Date().getFullYear() + 1, {
    message: 'O ano não pode ser maior que o próximo ano',
  })
  @Transform(({ value }) => Number(value))
  year: number;

  @IsOptional()
  @IsBoolean({ message: 'A disponibilidade deve ser um valor booleano' })
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;

    return Boolean(value);
  })
  available?: boolean;
}

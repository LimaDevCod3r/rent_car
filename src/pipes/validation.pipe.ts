import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    // Se não houver um metatype (tipo esperado) ou se não for um tipo que precisa de validação, retorna o valor sem modificações
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Converte os dados recebidos para a classe esperada usando class-transformer
    const object = plainToInstance(metatype, value) as object;

    // Valida o objeto convertido usando class-validator
    const errors = await validate(object);

    // Se houver erros de validação, lança uma exceção informando que a validação falhou
    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Erro de validação',
        errors: errors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
    }
    // Se passar na validação, retorna o valor sem modificações
    return value;
  }

  // Verifica se o tipo precisa de validação
  private toValidate(metatype: Constructor): boolean {
    const types: Constructor[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

// Tipo auxiliar para representar um construtor
type Constructor = { new (...args: any[]): any };

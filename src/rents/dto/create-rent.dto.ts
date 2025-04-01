import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateRentDto {
  @IsString()
  @IsNotEmpty()
  carId: string;

  @IsDateString()
  @IsNotEmpty()
  startAt: string;

  @IsDateString()
  @IsNotEmpty()
  endAt: string;
}

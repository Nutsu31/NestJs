import { IsPositive } from 'class-validator';

export class CreateReportDto {
  @IsPositive()
  price: number;
}

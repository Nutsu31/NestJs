import {
  IsString,
  IsLongitude,
  IsLatitude,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1950)
  @Max(2023)
  year: number;

  @IsLongitude()
  longitude: number;

  @IsLatitude()
  latitude: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  milage: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;
}

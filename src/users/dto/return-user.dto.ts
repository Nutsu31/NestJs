import { Expose, Exclude } from 'class-transformer';
export class ReturnUserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}

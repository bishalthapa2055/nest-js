import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateEmpDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNumber({}, { message: 'age must be a number' })
  age: number;
}

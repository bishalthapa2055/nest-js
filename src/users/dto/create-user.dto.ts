import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['admin', 'developer', 'intern'], {
    message: 'valid role is required !!',
  })
  role: 'admin' | 'developer' | 'intern';
}

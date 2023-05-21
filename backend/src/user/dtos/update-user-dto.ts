import { IsNotEmpty, IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  fullname: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  username: string;
}

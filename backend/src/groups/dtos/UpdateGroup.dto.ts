import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateGroupDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}

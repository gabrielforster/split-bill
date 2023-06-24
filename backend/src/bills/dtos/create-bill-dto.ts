import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateBillDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  type: 'income' | 'outcome';

  @IsNotEmpty()
  @IsString()
  groupId: string;
}

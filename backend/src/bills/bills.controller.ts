import {
  Body,
  Controller,
  Request,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { Auth } from '../decorators/auth.decorator';
import { RequestUser } from '../decorators/types/request-user';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dtos/create-bill-dto';
@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Auth()
  @Post()
  async createBill(@Body() data: CreateBillDto, @User() user: RequestUser) {
    return this.billsService.createBill(data, user);
  }
}

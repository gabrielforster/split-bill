import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Auth()
  @Get(':groupId')
  async getBillsByGroupId(
    @Param('groupId') groupId: string,
    @User() user: RequestUser,
  ) {
    return this.billsService.getBillsByGroupId(groupId, user);
  }

  @Auth()
  @Get(':groupId/summary')
  async getBillsSummaryByGroupId(
    @Param('groupId') groupId: string,
    @User() user: RequestUser,
  ) {
    return this.billsService.getBillsSummaryByGroupId(groupId, user);
  }
}

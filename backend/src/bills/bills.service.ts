import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RequestUser } from 'src/decorators/types/request-user';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateBillDto } from './dtos/create-bill-dto';

@Injectable()
export class BillsService {
  constructor(private readonly prisma: PrismaService) {}

  async createBill(data: CreateBillDto, user: RequestUser) {
    const isUserAGroupMember = await this.prisma.groupUser.findFirst({
      where: {
        groupId: data.groupId,
        userId: user.id,
      },
    });

    if (!isUserAGroupMember) {
      throw new UnauthorizedException('User is not a member of this group');
    }

    return this.prisma.bill.create({
      data: {
        ...data,
        userId: user.id,
      },
    });
  }

  async getBillsByGroupId(groupId: string, user: RequestUser) {
    const isUserAGroupMember = await this.prisma.groupUser.findFirst({
      where: {
        groupId,
        userId: user.id,
      },
    });

    if (!isUserAGroupMember) {
      throw new UnauthorizedException('User is not a member of this group');
    }

    return this.prisma.bill.findMany({
      where: {
        groupId,
      },
    });
  }

  async getBillsSummaryByGroupId(groupId: string, user: RequestUser) {
    const isUserAGroupMember = await this.prisma.groupUser.findFirst({
      where: {
        groupId,
        userId: user.id,
      },
    });

    if (!isUserAGroupMember) {
      throw new UnauthorizedException('User is not a member of this group');
    }

    const bills = await this.prisma.bill.findMany({
      where: {
        groupId,
      },
    });

    const billsSummary = bills.reduce(
      (acc, bill) => {
        if (bill.type === 'income') {
          acc.income += bill.amount;
        } else {
          acc.outcome += bill.amount;
        }

        return acc;
      },
      { income: 0, outcome: 0 },
    );

    return billsSummary;
  }
}

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

    const billsSummaryAndUserSummary = bills.reduce(
      (acc, bill) => {
        if (bill.userId === user.id) {
          acc.user.outcome += bill.amount;
          acc.user.income += bill.amount;
        }

        acc.group.outcome += bill.amount;
        acc.group.income += bill.amount;

        return acc;
      },
      {
        user: {
          outcome: 0,
          income: 0,
        },
        group: {
          outcome: 0,
          income: 0,
        },
      },
    );

    return billsSummaryAndUserSummary;
  }
}

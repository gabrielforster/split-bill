import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RequestUser } from '../decorators/types/request-user';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateGroupDto } from './dtos/CreateGroup.dto';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserGroups(user: RequestUser) {
    return this.prisma.groupUser.findMany({
      where: {
        userId: user.id,
      },
      include: {
        Group: true,
      },
    });
  }

  async findGroupById(groupId: string, user: RequestUser) {
    return this.prisma.groupUser.findFirst({
      where: {
        groupId,
        userId: user.id,
      },
      include: {
        Group: true,
      },
    });
  }

  async createGroup(group: CreateGroupDto, user: RequestUser) {
    return this.prisma.group.create({
      data: {
        ...group,
        createdBy: user.id,
        GroupUser: {
          create: {
            userId: user.id,
          },
        },
      },
    });
  }

  async updateGroup(groupId: string, group: CreateGroupDto, user: RequestUser) {
    const groupUser = await this.prisma.groupUser.findFirst({
      where: {
        groupId,
        userId: user.id,
      },
    });

    if (!groupUser) {
      throw new UnauthorizedException('You are not a member of this group');
    }

    return this.prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        ...group,
      },
    });
  }

  async deleteGroup(groupId: string, user: RequestUser) {
    const group = await this.prisma.group.findFirst({
      where: {
        id: groupId,
        createdBy: user.id,
      },
    });

    if (!group) {
      throw new UnauthorizedException('You are not the owner of this group');
    }

    return this.prisma.group.delete({
      where: {
        id: groupId,
      },
    });
  }
}

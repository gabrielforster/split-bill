import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestUser } from '../decorators/types/request-user';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateGroupDto } from './dtos/CreateGroup.dto';
import { BillsService } from '../bills/bills.service';

@Injectable()
export class GroupsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly billsService: BillsService,
  ) {}

  async getUserGroups(user: RequestUser) {
    const groups = await this.prisma.groupUser.findMany({
      where: {
        userId: user.id,
      },
      include: {
        Group: true,
      },
    });

    const result = groups.map(async (group) => {
      const summary = await this.billsService.getBillsSummaryByGroupId(
        group.Group.id,
        user,
      );

      return {
        ...group.Group,
        summary,
      };
    });

    return Promise.all(result);
  }

  async findGroupById(groupId: string, requestUser: RequestUser) {
    const groupUsers = await this.prisma.groupUser.findMany({
      where: {
        groupId,
      },
      select: {
        User: {
          select: {
            id: true,
            username: true,
            fullname: true,
            active: true,
          },
        },
      },
    });

    const group = await this.prisma.group.findFirst({
      where: {
        id: groupId,
      },
    });

    const users = await Promise.all(
      groupUsers.map(async (user) => {
        const summary =
          await this.billsService.getBillsSummaryByUserIdInGroupId(
            groupId,
            user.User.id,
            requestUser,
          );

        return {
          ...user.User,
          summary,
        };
      }),
    );

    const groupSummary = await this.billsService.getBillsSummaryByGroupId(
      groupId,
      requestUser,
    );

    const result = {
      ...group,
      users,
      summary: groupSummary,
    };

    return result;
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

  async getUserInvites(user: RequestUser) {
    console.log(user.id);
    return this.prisma.invite.findMany({
      where: {
        userId: user.id,
      },
      include: {
        Group: {
          select: {
            name: true,
            description: true,
            createdBy: true,
          },
        },
      },
    });
  }

  async inviteUserToGroup(
    groupId: string,
    username: string,
    user: RequestUser,
  ) {
    const userToInvite = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    const invite = await this.prisma.invite.findFirst({
      where: {
        groupId,
        userId: userToInvite.id,
      },
    });

    if (invite) {
      throw new UnauthorizedException('User already invited to this group');
    }

    const group = await this.prisma.group.findFirst({
      where: {
        id: groupId,
        createdBy: user.id,
      },
    });

    if (!group) {
      throw new UnauthorizedException('You are not the owner of this group');
    }

    return this.prisma.invite.create({
      data: {
        groupId,
        userId: userToInvite.id,
      },
    });
  }

  async acceptGroupInvite(inviteId: string, user: RequestUser) {
    const invite = await this.prisma.invite.findFirst({
      where: {
        id: inviteId,
        userId: user.id,
      },
    });

    if (!invite) {
      throw new UnauthorizedException('You are not invited to this group');
    }

    await this.prisma.invite.delete({
      where: {
        id: invite.id,
      },
    });

    return this.prisma.groupUser.create({
      data: {
        groupId: invite.groupId,
        userId: user.id,
      },
    });
  }

  async declineGroupInvite(inviteId: string, user: RequestUser) {
    const invite = await this.prisma.invite.findFirst({
      where: {
        id: inviteId,
        userId: user.id,
      },
    });

    if (!invite) {
      throw new UnauthorizedException('You are not invited to this group');
    }

    return this.prisma.invite.delete({
      where: {
        id: invite.id,
      },
    });
  }

  async getGroupInvites(groupId: string) {
    return this.prisma.invite.findMany({
      where: {
        groupId,
      },
      include: {
        User: {
          select: {
            id: true,
            username: true,
            fullname: true,
            active: true,
          },
        },
      },
    });
  }

  async removeUserFromGroup(
    groupId: string,
    userId: string,
    user: RequestUser,
  ) {
    const group = await this.prisma.group.findFirst({
      where: {
        id: groupId,
        createdBy: user.id,
      },
    });

    if (!group) {
      throw new UnauthorizedException('You are not the owner of this group');
    }

    if (group.createdBy === userId) {
      throw new UnauthorizedException(
        'You cannot remove the owner of the group',
      );
    }

    const groupUser = await this.prisma.groupUser.findFirst({
      where: {
        groupId,
        userId,
      },
    });

    return this.prisma.groupUser.delete({
      where: {
        id: groupUser.id,
      },
    });
  }
}

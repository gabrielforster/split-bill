import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Auth } from '../decorators/auth.decorator';
import { User } from '../decorators/user.decorator';
import { RequestUser } from '../decorators/types/request-user';
import { CreateGroupDto } from './dtos/CreateGroup.dto';
import { UpdateGroupDto } from './dtos/UpdateGroup.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Auth()
  @Get()
  async getGroups(@User() user: RequestUser) {
    return this.groupsService.getUserGroups(user);
  }

  @Auth()
  @Get('invites')
  async getInvites(@User() user: RequestUser) {
    console.log('user', user);
    return this.groupsService.getUserInvites(user);
  }

  @Auth()
  @Get(':id')
  async getGroup(@Param('id') id: string, @User() user: RequestUser) {
    return this.groupsService.findGroupById(id, user);
  }

  @Auth()
  @Post()
  async createGroup(
    @Body() groupData: CreateGroupDto,
    @User() user: RequestUser,
  ) {
    return this.groupsService.createGroup(groupData, user);
  }

  @Auth()
  @Put(':id')
  async updateGroup(
    @Param('id') id: string,
    @Body() groupData: UpdateGroupDto,
    @User() user: RequestUser,
  ) {
    return this.groupsService.updateGroup(id, groupData, user);
  }

  @Auth()
  @Delete(':id')
  async deleteGroup(@Param('id') id: string, @User() user: RequestUser) {
    return this.groupsService.deleteGroup(id, user);
  }

  @Auth()
  @Post(':id/users/invite/:username')
  async inviteUserToGroup(
    @Param('id') groupId: string,
    @Param('username') userId: string,
    @User() user: RequestUser,
  ) {
    return this.groupsService.inviteUserToGroup(groupId, userId, user);
  }

  @Auth()
  @Post('invites/:id/accept')
  async acceptInvite(@Param('id') id: string, @User() user: RequestUser) {
    return this.groupsService.acceptGroupInvite(id, user);
  }

  @Auth()
  @Post('invites/:id/decline')
  async declineInvite(@Param('id') id: string, @User() user: RequestUser) {
    return this.groupsService.declineGroupInvite(id, user);
  }

  @Auth()
  @Delete(':id/users/:userId')
  async removeUserFromGroup(
    @Param('id') groupId: string,
    @Param('userId') userId: string,
    @User() user: RequestUser,
  ) {
    return this.groupsService.removeUserFromGroup(groupId, userId, user);
  }
}

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
    console.log('HSHAHAHHA', user.id);
    return this.groupsService.getUserGroups(user);
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

  //  @Auth()
  //  @Post(':id/users/:userId')
  //  async inviteUserToGroup(
  //    @Param('id') groupId: string,
  //    @Param('userId') userId: string,
  //    @User() user: RequestUser,
  //  ) {
  //    return this.groupsService.inviteUserToGroup(groupId, userId, user);
  //  }
  //
  //  @Auth()
  //  @Delete(':id/users/:userId')
  //  async removeUserFromGroup(
  //    @Param('id') id: string,
  //    @Param('userId') userId: string,
  //    @User() user: RequestUser,
  //  ) {
  //    return this.groupsService.removeUserFromGroup(id, userId, user);
  //  }
}

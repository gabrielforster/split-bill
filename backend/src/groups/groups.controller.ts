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
import { GroupsService } from './groups.service';
import { Auth } from '../decorators/auth.decorator';
import { User } from '../decorators/user.decorator';
import { RequestUser } from 'src/decorators/types/request-user';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Auth()
  @Get()
  async getGroups(@User() user: RequestUser) {
    return await this.groupsService.getGroupsFromUser(user);
  }
}

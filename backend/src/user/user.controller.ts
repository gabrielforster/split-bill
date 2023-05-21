import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdatePasswordDto } from './dtos/update-password';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserNoPass } from './types';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() userData: CreateUserDto): Promise<UserNoPass> {
    return this.userService.create(userData);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserNoPass> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: UpdateUserDto,
  ): Promise<UserNoPass> {
    return this.userService.update({ id, data: userData });
  }

  @Put(':id/password')
  async updatePassword(
    @Param('id') id: string,
    @Body() userData: UpdatePasswordDto,
  ): Promise<UserNoPass> {
    return this.userService.updatePassword(id, userData);
  }

  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: string): Promise<void> {
    return this.userService.deactivate(id);
  }
}

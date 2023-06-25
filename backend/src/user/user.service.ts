import { hash, compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserNoPass } from './types';
import { UpdatePasswordDto } from './dtos/update-password';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<UserNoPass> {
    await this.checkExistsByEmailOrUsername({
      email: data.email,
      username: data.username,
    });

    data.password = await hash(data.password, 10);

    const user = await this.prisma.user.create({ data });

    delete user.password;

    return user;
  }

  async exists(username: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    return !!user;
  }

  async findMe(username: string): Promise<UserNoPass> {
    const me = await this.findByUsername(username);

    return me;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    return user;
  }

  async findByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new Error('Invalid credentials');

    return user;
  }

  async update({
    id,
    data,
  }: {
    id: string;
    data: UpdateUserDto;
  }): Promise<UserNoPass> {
    await this.checkExistsByEmailOrUsername({
      email: data.email,
      username: data.username,
    });

    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    delete user.password;

    return user;
  }

  async updatePassword(
    id: string,
    data: UpdatePasswordDto,
  ): Promise<UserNoPass> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    const passwordMatch = await compare(data.oldPassword, user.password);

    if (!passwordMatch) throw new Error('Old password does not match');

    data.newPassword = await hash(data.newPassword, 10);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: data.newPassword,
      },
    });

    delete updatedUser.password;

    return updatedUser;
  }

  async deactivate(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { active: false },
    });
  }

  async checkExistsByEmailOrUsername({
    email,
    username,
  }: {
    email?: string;
    username?: string;
  }): Promise<void> {
    if (email) {
      const existsByEmail = await this.prisma.user.findFirst({
        where: { email },
      });

      if (existsByEmail) throw new Error('User with this email already exists');
    }

    if (username) {
      const existsByUsername = await this.prisma.user.findFirst({
        where: { username },
      });

      if (existsByUsername)
        throw new Error('User with this username already exists');
    }
  }
}

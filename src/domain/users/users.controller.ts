import { Controller, UseGuards, Req, Get, Post, Body } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './schemas/users.schema';

import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async createNew(@Body() user: createUserDto): Promise<User> {
    const result = await this.usersService.createNew(user);

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserData(@Req() req): Promise<User> {
    const { id } = req.user;

    const user = await this.usersService.findById({ id });

    return user;
  }
}

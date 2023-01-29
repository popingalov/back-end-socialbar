import {
  Controller,
  UseGuards,
  Req,
  Get,
  Post,
  Body,
  Put,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './schemas/users.schema';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async createNewUser(@Body() user: CreateUserDto): Promise<User> {
    const result = await this.usersService.createNewUser(user);

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserData(@Req() req): Promise<User> {
    const { id } = req.user;
    const user = await this.usersService.getById({ id });

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateUserData(@Req() req, @Body() body: UpdateUserDto): Promise<User> {
    const { id } = req.user;
    const user = await this.usersService.updateUser({ id, payload: body });

    return user;
  }
}

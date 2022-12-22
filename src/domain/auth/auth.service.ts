import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'domain/users/users.service';
import { User } from 'domain/users/schemas/users.schema';

import { createJwtTokenDto } from './dto/create-jwt-token.dto';
import { validateGoogleUserDto } from './dto/validate-google-user.dto';
import { createGoogleUserDto } from './dto/create-google-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createGoogleUser(googleUser: createGoogleUserDto): Promise<User> {
    return await this.usersService.createNew(googleUser);
  }

  async validateGoogleUser(email: validateGoogleUserDto): Promise<User> {
    return await this.usersService.findByQuery(email);
  }

  createToken(data: createJwtTokenDto): string {
    return this.jwtService.sign(data);
  }
}
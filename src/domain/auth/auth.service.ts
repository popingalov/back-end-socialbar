import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/users.schema';

import { createJwtTokenDto } from './dto/create-jwt-token.dto';
import { validateGoogleUserDto } from './dto/validate-google-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateGoogleUserDto } from './dto/create-google-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createGoogleUser(googleUser: CreateGoogleUserDto): Promise<User> {
    return await this.usersService.createNewUser(googleUser);
  }

  async validateGoogleUser(email: validateGoogleUserDto): Promise<User> {
    return await this.usersService.findByQuery(email);
  }

  createToken(data: any): any {
    return this.jwtService.sign(data);
  }

  createTestToken(data: any): any {
    return { token: this.jwtService.sign(data) };
  }
  validToken(data: any): any {
    return this.jwtService.verify(data);
  }
}

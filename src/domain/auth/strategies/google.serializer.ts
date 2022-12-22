import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UsersService } from 'domain/users/users.service';

import { User } from 'domain/users/schemas/users.schema';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(public readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    const userDB = await this.usersService.findById({ id: user.id });

    done(null, userDB ?? null);
  }
}

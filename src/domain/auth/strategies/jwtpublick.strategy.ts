import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth.service';

@Injectable()
export class JwtPublickStrategy extends PassportStrategy(Strategy, 'publick') {
  constructor() {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        () => {
          return process.env.BASE_TOKEN;
        },
      ]),
      ignoreExpiration: true, // refactor
    });
  }

  async validate(payload: any) {
    if (payload.email === process.env.OWNER_MAIL) {
      payload.trigger = true;
    }

    return payload;
  }
}

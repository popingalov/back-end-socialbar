import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
config();
import { AuthService } from '../auth.service';
const { GOOGLE_ID, GOOGLE_SECRET, CALLBACK_URL } = process.env;

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      callbackURL: CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    if (!profile)
      throw new Error('No Google profile!' + accessToken + refreshToken); // refactor

    const email: string = profile.emails[0].value;
    const name = `${profile.name.givenName} ${profile.name.familyName}`;
    const picture: string = profile._json.picture;
    const locale: string = profile._json.locale;

    let user = await this.authService.validateGoogleUser({ email });

    if (!user)
      user = await this.authService.createGoogleUser({
        email,
        name,
        picture,
        locale,
      });

    const token = this.authService.createToken({ id: user.id, email, locale });

    done(null, { token });
  }
}

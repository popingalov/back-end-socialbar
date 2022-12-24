import { Controller, Get, Redirect, UseGuards, Req } from '@nestjs/common';

import { GoogleAuthGuard } from './strategies/google.guard';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async handleLogin() {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @Redirect()
  googleAuthRedirect(@Req() req) {
    const { token } = req.user;

    return { url: `http://localhost:3000?token=${token}` };
  }
}

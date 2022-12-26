import { Controller, Get, Redirect, UseGuards, Req } from '@nestjs/common';

import { GoogleAuthGuard } from './strategies/google.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  async handleLogin() {
    console.log('Doing things');
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  @Redirect()
  googleAuthRedirect(@Req() req) {
    const { token } = req.user;

    return { url: `https://localhost:3000/?token=${token}` };
  }
}

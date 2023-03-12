import {
  Controller,
  Get,
  Redirect,
  UseGuards,
  Req,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenGenerator } from './dto/createWorkToken.dto';

import { GoogleAuthGuard } from './strategies/google.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  async handleLogin() {
    console.log('Doing things');
  }

  @Post('token')
  async tokenGenerator(@Body() body: TokenGenerator) {
    return this.authService.createTestToken({ ...body });
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @Redirect()
  googleAuthRedirect(@Req() req) {
    const { token } = req.user;

    return { url: `https://cosiaclbar.netlify.app/?token=${token}` };
  }
}

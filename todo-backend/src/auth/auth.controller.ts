import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/google.guard';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './utils/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google authentication' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect(@Req() req) {
    return this.authService.login(req.user);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshTokens(@Req() req) {
    console.log(req.user);
    const userId = req?.user.sub;
    const username = req.user.username;

    return this.authService.refreshTokens(userId, username);
  }
}

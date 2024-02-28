import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { GoogleAuthGuard } from './guard/google.guard';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guard/refresh-token.guard';
import { UserAuthRole } from 'src/db';
import { AccessTokenGuard } from './guard';
import { UserService } from 'src/user/user.service';
import { ZodPipe } from 'src/utils';
import {
  loginDto,
  loginSchema,
  registerDto,
  registerSchema,
} from './auth.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleGoogleLogin() {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleGoogleRedirect(@Req() req) {
    return this.authService.login({
      ...req.user,
      loginWith: UserAuthRole.GOOGLE,
    });
  }

  @Post('login')
  @UsePipes(new ZodPipe(loginSchema))
  async handleLogin(@Body() userLoginDto: loginDto) {
    return this.authService.login({
      email: userLoginDto.email,
      password: userLoginDto.password,
      loginWith: UserAuthRole.DEFAULT,
    });
  }

  @Post('register')
  @UsePipes(new ZodPipe(registerSchema))
  async handleRegister(@Body() createdUserDto: registerDto) {
    return this.authService.register({
      email: createdUserDto.email,
      password: createdUserDto.password,
    });
  }

  @Get('profile')
  @UseGuards(AccessTokenGuard)
  async getProfile(@Req() req) {
    if (req.user.password) delete req.user.password;
    return req.user;
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshTokens(@Req() req) {
    const userId = req?.user.sub;
    const username = req.user.username;

    return this.authService.refreshTokens(userId, username);
  }
}

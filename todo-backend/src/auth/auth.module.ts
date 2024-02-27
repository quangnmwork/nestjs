import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/google-strategy';
import { AuthService } from './auth.service';
import { RefreshTokenStrategy } from './utils/refresh-token-strategy';
import { AccessTokenStrategy } from './utils/access-token-strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    RefreshTokenStrategy,
    AccessTokenStrategy,
  ],
})
export class AuthModule {}

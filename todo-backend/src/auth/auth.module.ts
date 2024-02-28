import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategy/google-strategy';
import { AuthService } from './auth.service';
import { RefreshTokenStrategy } from './strategy';
import { AccessTokenStrategy } from './strategy/access-token-strategy';

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

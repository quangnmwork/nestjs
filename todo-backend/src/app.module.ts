import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './db';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './auth/strategy/access-token-strategy';
import { RefreshTokenStrategy } from './auth/strategy/';
import { AuthService } from './auth/auth.service';
import { GoogleStrategy } from './auth/strategy/google-strategy';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_REFRESH_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
    JwtModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    AccessTokenStrategy,
    GoogleStrategy,
    RefreshTokenStrategy,
  ],
})
export class AppModule {}

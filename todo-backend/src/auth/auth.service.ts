import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Token, User as UserModel } from 'src/model';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '60m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async refreshTokens(userId: string, username: string) {
    // ちゃんとやりたい場合は、データベースに保存しておいたハッシュ化された refreshToken と
    // ユーザーから渡された refreshToken をハッシュ化して比較して、一致しない場合は例外を投げる。
    // ここはサンプルなので、 refreshTokens が呼ばれたら新しい accessToken を返す。
    const tokens = await this.getTokens(userId, username);
    return tokens;
  }

  async login(user?: UserModel): Promise<Token> {
    if (!user) throw new InternalServerErrorException('Don`t have user');

    const { accessToken, refreshToken } = await this.getTokens(
      user.id,
      user.email,
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}

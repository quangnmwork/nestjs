import { BadRequestException, Injectable } from '@nestjs/common';
import { Token } from 'src/model';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserAuthRole } from 'src/db';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
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

  async validateUser(email: string) {
    return this.userService.findUser(email);
  }

  async loginWithGoogle() {}

  async login(dataInput?: {
    email: string;
    password: string;
    loginWith?: UserAuthRole;
  }): Promise<Token> {
    const user = await this.validateUser(dataInput.email);

    if (
      user &&
      dataInput.loginWith === UserAuthRole.DEFAULT &&
      user.authenticationType === UserAuthRole.GOOGLE
    ) {
      throw new BadRequestException('This account already exist');
    }

    if (!user) {
      if (dataInput.loginWith !== UserAuthRole.DEFAULT) {
        // Create google account to database here
        const user = await this.userService.createUser({
          email: dataInput.email,
          password: '',
          authenticationType: UserAuthRole.GOOGLE,
        });

        const { accessToken, refreshToken } = await this.getTokens(
          user.id.toString(),
          user.email,
        );

        return {
          accessToken,
          refreshToken,
        };
      } else {
        throw new BadRequestException('User is not found');
      }
    }

    if (user.authenticationType === UserAuthRole.DEFAULT) {
      // Validate password here
      const isPasswordMatch = await bcrypt.compare(
        dataInput.password,
        user.password,
      );

      if (!isPasswordMatch)
        throw new BadRequestException('Password does not match');
    }

    const { accessToken, refreshToken } = await this.getTokens(
      user.id.toString(),
      user.email,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(dataInput?: {
    email: string;
    password: string;
  }): Promise<Token> {
    const isUserExist = !!(await this.validateUser(dataInput.email));

    if (isUserExist) throw new BadRequestException('User is exist');

    await this.userService.createUser({
      email: dataInput.email,
      password: dataInput.password,
    });

    return await this.login(dataInput);
  }
}

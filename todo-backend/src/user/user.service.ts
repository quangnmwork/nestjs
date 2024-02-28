import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserAuthRole, UserEntity } from 'src/db';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findUser(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) return null;

    return user;
  }

  async createUser(
    userData: Pick<UserEntity, 'email' | 'password'> & {
      authenticationType?: UserAuthRole;
    },
  ) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = this.userRepository.create({
      email: userData.email,
      password:
        userData.authenticationType === UserAuthRole.GOOGLE
          ? ''
          : hashedPassword,
      authenticationType: userData.authenticationType || UserAuthRole.DEFAULT,
    });

    return this.userRepository.save(user);
  }
}

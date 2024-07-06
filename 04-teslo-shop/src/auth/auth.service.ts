import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Exclude } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private handleDatabaseError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(`${error.detail}`);
    }
    console.log(error.detail);
    throw new InternalServerErrorException(`CH3Ck L0GS!!`);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...restOfUserData } = createUserDto;

      const newUser = this.userRepository.create({
        ...restOfUserData,
        password: await bcrypt.hash(password, 10),
      });
      await this.userRepository.save(newUser);

      return newUser;
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }
}

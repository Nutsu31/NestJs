import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(email: string, password: string) {
    //check if user already exists
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    // Salt user password
    const salt = randomBytes(8).toString('hex');
    // Hash user password
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // Join salt and hash
    const result = salt + '.' + hash.toString('hex');

    //Create a new user
    const user = await this.usersService.create(email, result);

    return user;
  }

  async signIn(email: string, password: string) {
    //check if user already exists
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Email or password incorrect');
    }

    return user;
  }
}

/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../services/users.service';
import { Users } from '../models/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<Users | null> {
    const user = await this.usersService.findOne(email);
    if (user && user.password && (await bcrypt.compare(password, user.password))) {
      const {...result } = user as any;
      return result as Users;
    }

    throw new UnauthorizedException('Credenciales inválidas');
  }

  async login(user: any): Promise<{ access_token: string }> {

    const mail = user._doc.email;
    const id = user._doc._id;
    const payload = {mail, id }
    return {
      access_token: this.jwtService.sign(payload, { secret: process.env.SECRET }),
    };
  }
}
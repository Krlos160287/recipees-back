/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, UnauthorizedException } from '@nestjs/common';
import { Users } from 'src/models/user.dto';
import { AuthService } from 'src/services/auth.service';
import { UsersService } from 'src/services/users.service';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) {}

  @Get()
  async findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get(':email')
  async findOne(@Param('email') email: string): Promise<Users> {
    return this.usersService.findOne(email);
  }

  @Post()
  async create(@Body() usersDto: Users): Promise<Users> {
    return this.usersService.create(usersDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() usersDto: Users): Promise<Users> {
    return this.usersService.update(id, usersDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Users> {
    return this.usersService.delete(id);
  }

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }): Promise<{ access_token: string }> {
    const user = await this.authService.validateUser(credentials.email, credentials.password);
    if (user) {
      return this.authService.login(user);
    } else {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }
}

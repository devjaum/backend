import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body('username') username: string) {
    return this.usersService.create(username);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('login')
  async login(@Body('username') username: string) {
    let user = await this.usersService.findByUsername(username);
    if(!user) user = await this.usersService.create(username);
    return user;
  }

}

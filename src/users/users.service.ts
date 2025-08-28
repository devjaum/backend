import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(username: string) {
    if (!username) throw new Error('Username é obrigatório');
    const user = this.usersRepository.create({ username });
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findByUsername(username: string) {
    return this.usersRepository.findOneBy({username});
  }
}

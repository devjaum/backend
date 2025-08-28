import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { User } from '../users/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(content: string, userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new Error('Usuário não encontrado');

    const message = this.messagesRepository.create({ content, user });
    return this.messagesRepository.save(message);
  }

  findAll() {
    return this.messagesRepository.find({ relations: ['user'] });
  }
}

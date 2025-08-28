import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  create(
    @Body('content') content: string,
    @Body('userId') userId: number,
  ) {
    return this.messagesService.create(content, userId);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }
}

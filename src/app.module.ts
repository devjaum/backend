import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { ChatGateway } from './chat/chat.gateway';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',   // altere se seu user for diferente
      password: 'Kalista@321',   // altere para sua senha
      database: 'chatdb',
      autoLoadEntities: true,
      synchronize: true, // cria as tabelas automaticamente (bom para dev)
    }),
    UsersModule,
    MessagesModule,
  ],
  providers: [ChatGateway],
})
export class AppModule {}

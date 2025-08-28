import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  // Mapa socket.id → user
  connectedUsers = new Map<string, string>();

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const user = this.connectedUsers.get(client.id);
    if (user) {
      this.server.emit('user_left', { user });
      this.connectedUsers.delete(client.id);
    }
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('login')
  handleLogin(@MessageBody() data: { username: string }, @ConnectedSocket() client: Socket) {
    this.connectedUsers.set(client.id, data.username);
    this.server.emit('user_joined', { user: data.username });
    console.log(`${data.username} entrou no chat`);
  }

  @SubscribeMessage('send_message')
  handleMessage(@MessageBody() data: { content: string }, @ConnectedSocket() client: Socket) {
    const user = this.connectedUsers.get(client.id);
    if (!user) return;

    const messageData = { user, content: data.content };
    this.server.emit('receive_message', messageData);
    console.log(`Mensagem de ${user}: ${data.content}`);
  }
}

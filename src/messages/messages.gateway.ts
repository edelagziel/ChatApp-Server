import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  
  @WebSocketServer()
  server: Server;


  @SubscribeMessage('join_chat')
  handleJoin(
    @MessageBody() chatId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`chat-${chatId}`);
  }

  sendMessage(chatId: number, message: any) {
    this.server.to(`chat-${chatId}`).emit('new_message', message);
  }
}
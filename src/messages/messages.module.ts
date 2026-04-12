import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import {DatabaseModule} from "../database/database.module"
import { ChatGateway } from './messages.gateway';

@Module({
    imports: [DatabaseModule],
  controllers: [MessagesController],
  providers: [MessagesService, ChatGateway],
})
export class MessagesModule {}

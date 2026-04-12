import { Injectable } from '@nestjs/common';
import {createMessageDto} from "./dto/create-messages.dto"
import {updateMessageDto} from "./dto/update-messages.dto"
import { DatabaseService } from 'src/database/database.service';
import { ForbiddenException } from '@nestjs/common';
import { ChatGateway } from './messages.gateway';


@Injectable()
export class MessagesService {
    constructor(private readonly databaseService:DatabaseService,private readonly chatGateway: ChatGateway){}
  async create(createMessageDto: createMessageDto)
  {
    const chatMembers= await this.databaseService.chatMember.findUnique({where:{userId_chatId:{userId:createMessageDto.senderId,chatId:createMessageDto.chatId}}})
    if(!chatMembers) throw new ForbiddenException("You are not a member of this chat");
    
   const message= await this.databaseService.message.create({data:createMessageDto})
   this.chatGateway.sendMessage(message.chatId,message);
   return message;
  }

  async findAll() {
    return await this.databaseService.message.findMany();
  }

  async findOne(id: number) {
    return await this.databaseService.message.findUnique({where:{id}})
  }

 async  update(id: number, updateMessageDto: updateMessageDto) {
    return await this.databaseService.message.update({where:{id},data:updateMessageDto})
  }

async  remove(id: number) {
    return await this.databaseService.message.delete({where:{id}})
  }
}

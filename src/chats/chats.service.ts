import { Injectable } from '@nestjs/common';
import {CreateChatsDto} from "./dto/create-chats.dto"
import {UpdateChatsDto} from "./dto/update-chats.dto"
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class ChatsService {
constructor(private readonly databaseService:DatabaseService){}

 async create(createChatDto: CreateChatsDto) {
   return  await this.databaseService.chat.create({data:createChatDto})
  }

 async findAll() {
    return await this.databaseService.chat.findMany();
  }

 async findOne(id: number) {
    return await this.databaseService.chat.findUnique({where:{id}})
  }

 async update(id: number, updateChatDto: UpdateChatsDto) {
    return  await this.databaseService.chat.update({where:{id},data:updateChatDto})
  }

 async remove(id: number) {
    return await this.databaseService.chat.delete({where:{id}})
  }
}

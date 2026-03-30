import { Injectable } from '@nestjs/common';
import {createMessageDto} from "./dto/create-messages.dto"
import {updateMessageDto} from "./dto/update-messages.dto"
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MessagesService {
    constructor(private readonly databaseService:DatabaseService){}
  async create(createMessageDto: createMessageDto) {
   return await this.databaseService.message.create({data:createMessageDto})
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

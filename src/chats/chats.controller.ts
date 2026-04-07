import { Controller, Get, Post, Body, Patch, Param, Delete,ParseIntPipe,ValidationPipe } from '@nestjs/common';
import { ChatsService } from './chats.service';
import {CreateChatsDto} from "./dto/create-chats.dto"
import {UpdateChatsDto} from "./dto/update-chats.dto"

//need to open chat member controller  !!!!!



@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
 async create(@Body(ValidationPipe) createChatDto: CreateChatsDto) {
    return this.chatsService.create(createChatDto);
  }

  @Get()
 async findAll() {
    return this.chatsService.findAll();
  }


  @Get("user/:id")
  async findAllUserChats(@Param("id",ParseIntPipe)id:number)
  {
      const chatsFounds=await this.chatsService.findAllUserChats(id)
      return chatsFounds ?? [];
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const chatsFound = await this.chatsService.findOne(id);
    return chatsFound ?? [];
  }

  @Patch(':id')
 async update(@Param('id',ParseIntPipe) id: number, @Body(ValidationPipe) updateChatDto: UpdateChatsDto) {
    return this.chatsService.update(id, updateChatDto);
  }

  @Delete(':id')
 async remove(@Param('id',ParseIntPipe) id: number) {
    return this.chatsService.remove(id);
  }
}

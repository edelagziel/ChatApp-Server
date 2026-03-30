import { Controller, Get, Post, Body, Patch, Param, Delete,ParseIntPipe,ValidationPipe } from '@nestjs/common';
import { MessagesService } from './messages.service';
import {createMessageDto} from "./dto/create-messages.dto"
import {updateMessageDto} from "./dto/update-messages.dto"
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body(ValidationPipe) createMessageDto: createMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body(ValidationPipe) updateMessageDto: updateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.messagesService.remove(id);
  }
}

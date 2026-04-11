import { Injectable, NotFoundException } from '@nestjs/common';
import {CreateChatsDto} from "./dto/create-chats.dto"
import {UpdateChatsDto} from "./dto/update-chats.dto"
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ChatsService {
constructor(private readonly databaseService:DatabaseService){}





  private async getAllMembersIdFromEmails(createChatDto: CreateChatsDto):Promise<number[]>
  {
    const targetEmails=createChatDto.emails;
   const foundUsers= await this.databaseService.user.findMany({where:{email:{in:targetEmails}}})
   if(foundUsers.length!==targetEmails.length) throw new NotFoundException("One or more users were not found")
    return foundUsers.map((user)=>user.id)
  }

 async create(createChatDto: CreateChatsDto) {
    const usersIds= await this.getAllMembersIdFromEmails(createChatDto)
    const OrguserId=createChatDto.userId;
    const allUsersIds=[...usersIds,OrguserId];

   return  await this.databaseService.chat.create({data:{
    isGroup:createChatDto.isGroup,
    groupName: createChatDto.groupName,
    chatMembers:{
      create:allUsersIds.map((CurUserId)=>({
          userId:CurUserId,
          role: OrguserId===CurUserId ? 'ADMIN' : 'BASE',
          unreadCount:0,
          lastOpenAt: new Date()
      })
       )
    }
   },include:{
    chatMembers:{
      include:{user:true}
    }
   }})}

 async findAll() {
    return await this.databaseService.chat.findMany();
  }
  async findAllUserChats(id:number)
  {
    return await this.databaseService.chat.findMany(
    {where:{chatMembers:{some:{userId:id}}},
    include:{chatMembers:{include:{user:{select:{id:true,first_name:true,last_name:true}}}},
    messages:{take:1,orderBy:{createdAt:'desc'}}
  }})
  }

  async findAllChatMsg(id:number)
  {
    return await this.databaseService.message.findMany({where:{chatId:id},orderBy:{createdAt:"asc"},include:{sender:{select:{id:true,first_name:true,last_name:true}}}})
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

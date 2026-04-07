import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException,ConflictException } from '@nestjs/common';
@Injectable()
export class UserService {
constructor(private readonly databaseService:DatabaseService ){}

 async create(createUserDto: CreateUserDto) {
    try
    {
      const saltRounds = 10;
      const hashedPassword= await bcrypt.hash(createUserDto.password,saltRounds);
      return await this.databaseService.user.create({data: {...createUserDto,password:hashedPassword}})
    }
    catch(err)
    {
      if (err.code === 'P2002') {
        throw new ConflictException('email alredy exist in the system ');
      }
        throw new InternalServerErrorException("faild to create user ");    }
  }

 async findAll() {
  return  await this.databaseService.user.findMany();
  }

 async findOne(id: number) {
    return await this.databaseService.user.findUnique({where:{id}})
  }

 async update(id: number, updateUserDto: UpdateUserDto) {
    return  await this.databaseService.user.update({where:{id},data:updateUserDto})
  }

async remove(id: number) {
  return  await this.databaseService.user.delete({where:{id}})
  }

async findByEmail(email:string){
  return await this.databaseService.user.findUnique({where:{email}})
}
}

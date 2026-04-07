import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserDto } from '../user/dto/create-user-dto';
import  {UserService} from "../user/user.service"
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt"
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly userServise:UserService){

  }
  async login(loginAuthDto: LoginAuthDto) {
    const user :User|null = await this.userServise.findByEmail(loginAuthDto.email)
    if(!user) throw new UnauthorizedException('Invalid credentials');
    const isPasswordValid= await bcrypt.compare(loginAuthDto.password,user.password)
    if(!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
    return {message:"login succsed",Id:user.id};

 
  }

  logout(res:Response) {
    //res.clearCookie('jwt');
    return { message:"susses deleate cookies"}
  }

  register(registerAuthDto:CreateUserDto) 
  {
    return this.userServise.create(registerAuthDto)
  }
}

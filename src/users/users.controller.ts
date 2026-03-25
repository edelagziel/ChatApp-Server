import { Body, Controller, Delete, Get, Param, Patch, Post, Query,ParseIntPipe,ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateuserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
@Controller('users')
export class UsersController {
constructor(private readonly userService:UsersService){}

  @Get()//find all users 
  findAll(@Query('role')role?:'INTERN'|'ENGINEER'|'ADMIN')
  {
    const roleArray= this.userService.findAll(role);
    if(roleArray.length===0) throw new NotFoundException('not valid role')
      return roleArray;
  }

  @Get(":id") // find one users the id is in the parm of the url
  Findone(@Param("id",ParseIntPipe) id:number)
  {
        const user= this.userService.Findone(id);
        if(!user) throw new NotFoundException('user not found');
        return user;
  }

  @Post()
  create(@Body(ValidationPipe) createuserDto:CreateuserDto )
  {
    return this.userService.create(createuserDto);
  }


  @Patch(":id")
  update(@Param("id",ParseIntPipe) id:number, @Body(ValidationPipe) updateUserDto:UpdateUserDto)
  {
    return this.userService.update(id,updateUserDto);
  }

  @Delete(":id")
  delete(@Param("id",ParseIntPipe) id:number )
  {
    return this.userService.delete(id);
  }



}

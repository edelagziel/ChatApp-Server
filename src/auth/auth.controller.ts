import { Controller, Get, Post, Body, Patch, Param, Res, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserDto } from '../user/dto/create-user-dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}
@Post('login')
login(@Body() loginAuthDto: LoginAuthDto ){
  return this.authService.login(loginAuthDto);
}

@Post('register')
register(@Body()registerAuthDto:CreateUserDto){
  return this.authService.register(registerAuthDto);
}
@Post('logout')
logout(@Res({passthrough:true}) res:Response)
{
  return this.authService.logout(res)
}
}

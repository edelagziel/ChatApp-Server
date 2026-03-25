import { IsEmail,IsEnum,IsNotEmpty,IsString } from "class-validator";

export class CreateuserDto
{

  @IsNotEmpty() @IsString()
  name:string;

  @IsEmail()
  email:string;

  @IsEnum(['INTERN','ENGINEER','ADMIN'],
    {message:'valid role required'}
  )
  role:'INTERN'|'ENGINEER'|'ADMIN';
}


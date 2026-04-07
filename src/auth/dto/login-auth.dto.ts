
import { IsEmail,IsNotEmpty,IsString,IsStrongPassword } from "class-validator";

export class LoginAuthDto {

@IsNotEmpty() @IsString()  
  password:string


@IsEmail() @IsNotEmpty()
  email: string 

}

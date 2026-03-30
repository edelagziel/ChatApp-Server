import { IsEmail,IsNotEmpty,IsString,IsOptional,IsStrongPassword } from "class-validator";


export class CreateUserDto{
  @IsNotEmpty() @IsString()
  first_name :string 

   @IsString() @IsOptional()
  last_name: string


  @IsEmail() @IsNotEmpty()
  email: string 


  @IsNotEmpty() @IsString() @IsStrongPassword({
    minLength: 8,        
    minLowercase: 1,     
    minUppercase: 1,     
    minNumbers: 1,       
    minSymbols: 1,       
  }, { 
  message: 'The password is too weak. It must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.'})
  password:string
}
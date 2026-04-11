import { IsString,IsBoolean,ValidateIf,IsNotEmpty,IsEmail,IsArray,IsNumber } from "class-validator";


export class CreateChatsDto{
  @IsBoolean()
  isGroup: boolean
  @IsString() @IsNotEmpty() @ValidateIf((obj) =>obj.isGroup===true)
  groupName:string

  @IsArray() @IsEmail({},{each:true}) @IsNotEmpty()  
  emails:string[]

  @IsNumber()
  userId:number
}
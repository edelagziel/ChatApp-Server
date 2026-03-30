import { IsString,IsOptional,IsBoolean,ValidateIf,IsNotEmpty } from "class-validator";


export class CreateChatsDto{
  @IsOptional() @IsBoolean()
  isGroup: boolean
  @IsString() @IsNotEmpty() @ValidateIf((obj) =>obj.isGroup===true)
  groupName:string

}
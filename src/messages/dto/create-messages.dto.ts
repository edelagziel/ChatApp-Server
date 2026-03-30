import {IsString,IsNotEmpty,IsInt} from 'class-validator'

export class createMessageDto{
  @IsString() @IsNotEmpty()
  content: string 
  @IsInt()
  chatId:number
  @IsInt()
  senderId:number //needed to be deleted after adding token for saftey
}


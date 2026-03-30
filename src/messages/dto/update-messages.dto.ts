import   {createMessageDto} from "./create-messages.dto"
import {PartialType} from "@nestjs/mapped-types"
export class updateMessageDto extends PartialType(createMessageDto){}


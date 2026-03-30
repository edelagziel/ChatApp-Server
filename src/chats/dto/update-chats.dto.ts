import {CreateChatsDto} from "./create-chats.dto"
import { PartialType } from "@nestjs/mapped-types"


export class UpdateChatsDto extends PartialType(CreateChatsDto){}
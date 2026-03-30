import { CreateUserDto } from "./create-user-dto";
import { PartialType,OmitType } from "@nestjs/mapped-types";


export class updateUserDto extends PartialType(OmitType(CreateUserDto ,['password'] as const)){}
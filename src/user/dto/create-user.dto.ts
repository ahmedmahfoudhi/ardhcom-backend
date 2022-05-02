import { IsAlpha, IsEmail, IsEnum, IsIn, IsNotEmpty, IsNumberString, IsOptional, Length, MinLength } from "class-validator";
import { states } from "src/shared/states";
import { UserRolesEnum } from "../enums/user-roles.enum";

export class CreateUserDto {

    @IsNotEmpty()
    name:string;




    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @MinLength(8)
    password:string;

    @IsNotEmpty()
    @IsIn(['male','other','female'])
    gender:string;

    @IsNotEmpty()
    @IsEnum(UserRolesEnum)
    role: UserRolesEnum

    @IsOptional()
    @IsIn(states)
    state:string;

    @IsNotEmpty()
    @IsNumberString()
    @Length(8,8)
    phoneNumber:string

    // name:string;
    // phoneNumber:string;
    // email:string;
    // password:string;


}

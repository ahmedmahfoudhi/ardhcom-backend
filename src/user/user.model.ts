import mongoose from "mongoose";
import { UserRolesEnum } from "./enums/user-roles.enum";

export const UserSchema = new mongoose.Schema(
    {
        name : {type:String,required:true},
        role: {type:String,enum:UserRolesEnum,default:UserRolesEnum.USER},
        gender : {type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        state:{type:String},
        phoneNumber:{type:String,required:true}
    },
    {timestamps:true}
);


export interface User{
    id:string;
    name:string;
    role: string;
    state: string;
    gender:string;
    password:string;
    email:string;
    phoneNumber:string;

}
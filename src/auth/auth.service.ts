import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { throwIfEmpty } from 'rxjs';
import { comparePasswords, hashPassword } from 'src/shared/passwords';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {

  constructor(private readonly userService:UserService, private jwtService:JwtService){}

  async signup(createUserDto: CreateUserDto) {
    
    let user = await this.userService.findOneByEmail(createUserDto.email);
    if(user){
      throw new BadRequestException(`البريد الالكتروني مستخدم`);
    }
    user = await this.userService.findOneByPhoneNumber(createUserDto.phoneNumber);
    if(user){
      throw new BadRequestException(`رقم الهاتف مستخدم`)
    }
    createUserDto.password = await hashPassword(createUserDto.password);
    const newUser = await this.userService.insertOne(createUserDto);
    const access_token = this.generateToken(newUser.email,newUser.role,newUser.id,newUser.password);
    delete newUser.password
    return {
      user:newUser,
      access_token
    }
  }

  async signin(loginDto:LoginDto){
    const user = await this.userService.findOneByEmail(loginDto.email);
    if(!user){
      throw new UnauthorizedException(`كلمة المرور أو البريد الالكتروني خاطئ`);
    }
    let passwordComparaison = await comparePasswords(loginDto.password,user.password);
    if(!passwordComparaison){
      throw new UnauthorizedException(`كلمة المرور أو البريد الالكتروني خاطئ`);
    }



    const access_token = this.generateToken(user.email,user.role,user.id,user.password);
    const {password, ...result} = user._doc;
    return {
      user:result,
      access_token
    }



  }


  generateToken = (email:string,role:string,id:string,password:string) => {
    const payload : JwtPayloadDto = {
      email,
      id,
      role,
      password,
    }
    return this.jwtService.sign(payload);
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';
import { Model } from 'mongoose';
import { hashPassword } from 'src/shared/passwords';

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertOne(createUserDto: CreateUserDto): Promise<User>{
    const user = new this.userModel(createUserDto);
    const savedUser = await user.save();
    return savedUser;
  }

  async findAll() {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async findOneByEmail(email:string): Promise<any>{
    const user = await this.userModel.findOne({email});
    return user;
  }

  async findOneByPhoneNumber(phoneNumber:string){
    const user = await this.userModel.findOne({phoneNumber});
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let user:any = null;
    try{
      user = await this.findOne(id);
    }catch(err){
      throw new NotFoundException(`user with id ${id} does not exsit`)  
    }
    if(!user){
      throw new NotFoundException(`user with id ${id} does not exist`);
    }
    if(updateUserDto.email && user.email !== updateUserDto.email){
      const auxilaryUser = await this.findOneByEmail(updateUserDto.email);
      if(auxilaryUser){
        throw new BadRequestException(`email is not valid`);
      }
    }
    if(updateUserDto.password){
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }
    user._doc = {...user._doc,...updateUserDto}
    
    const updatedUser = await user.save();
    delete updatedUser.password
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.userModel.findOne({id})
    if(!user){
      throw new NotFoundException(`user with id ${id} does not exist`)
    }
    const result = await this.userModel.deleteOne({id})
    if(result.deletedCount === 1){
      return `User with id ${id} has been deleted`
    }
    return `User with id ${id} was not deleted`
    
  }
}

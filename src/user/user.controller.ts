import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorator/roles.metadata';
import { AuthGuard } from '@nestjs/passport';
import { AuthorisationGuard } from 'src/auth/guards/authorisation.guard';
import { UserRolesEnum } from './enums/user-roles.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'),AuthorisationGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Roles(UserRolesEnum.USER,UserRolesEnum.SERVICE_PROVIDER)
  @UseGuards(AuthGuard('jwt'),AuthorisationGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }


  @Roles(UserRolesEnum.USER,UserRolesEnum.SERVICE_PROVIDER)
  @UseGuards(AuthGuard('jwt'),AuthorisationGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

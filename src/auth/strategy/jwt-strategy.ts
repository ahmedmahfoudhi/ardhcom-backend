import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY || 'secret',
    });
  }
  async validate(payload: JwtPayloadDto) {
    const user = await this.userService.findOneByEmail(
      payload.email
    );
    if (!user) {
      throw new UnauthorizedException('غير مخول للحصول على هذه المعلومات');
    }
    if(user.password !== payload.password){
      throw new UnauthorizedException('لقد تم تغيير الرقم السري الخاص بكم')
    }
    delete user.password;
    return user;
  }
}
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt-strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[UserModule, PassportModule.register({defaultStrategy:'jwt'}),JwtModule.register({
    secret: process.env.SECRET_KEY || 'secret',
    signOptions: {expiresIn:60*60*24},
  })],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
})
export class AuthModule {}

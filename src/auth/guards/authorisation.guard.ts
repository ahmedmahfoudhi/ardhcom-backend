import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRolesEnum } from 'src/user/enums/user-roles.enum';

@Injectable()
export class AuthorisationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndMerge('roles', [
      context.getClass(),
      context.getHandler(),
    ]);
    const user = context.switchToHttp().getRequest().user;
    const paramId = context.switchToHttp().getRequest().params.id;
    return requiredRoles.includes(user.role) && paramId === user.id || user.role === UserRolesEnum.ADMIN;
  }
}
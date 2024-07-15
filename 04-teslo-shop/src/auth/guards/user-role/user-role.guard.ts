import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserRoleGuard implements CanActivate {
  
  constructor(
    //Se crea una instancia de la clase Reflector, la cual nos permitirá obtener la información de los decoradores que se encuentran en los controladores y rutas.
    private readonly reflector: Reflector
  ) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //Se obtienen los roles validos que se encuentran en el decorador roles.
    const validRoles = this.reflector.get('roles', context.getHandler())
    console.log(validRoles);
    return true;
  }
}

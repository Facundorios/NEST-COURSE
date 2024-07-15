import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-proctected.decorator';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
//Se crea la clase UserRoleGuard, la cual implementa la interfaz CanActivate, esto quiere decir que se debe implementar el metodo canActivate, el cual se encarga de validar si el usuario tiene los roles necesarios para acceder a la ruta.
export class UserRoleGuard implements CanActivate {
  constructor(
    //Se crea una instancia de la clase Reflector, la cual nos permitirá obtener la información de los decoradores que se encuentran en los controladores y rutas.
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //Se obtienen los roles validos que se encuentran en el decorador roles.
    const validRoles = this.reflector.get(META_ROLES, context.getHandler());

    //Si no se encuentran roles validos, se retorna true.
    if (!validRoles) return true
    //Si no se encuentran roles validos, se retorna true.
    if (validRoles.length === 0) return true

    //Se hace una constante request que extrae del context la petición con el metodo switchToHttp().getRequest(), el primero es el contexto de la petición y el segundo es el metodo que se utiliza para obtener la petición.
    const request = context.switchToHttp().getRequest();
    //Se obtiene el usuario que se encuentra en la petición y se lo tipa como User.
    const user = request.user as User;
    //Se hace un condicional en donde si el usuario no se encuentra, se lanza un error 404 con el mensaje Usuario no encontrado.
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    for (const role of user.roles) {
      if (validRoles.includes(role)) {
        return true;
      }
    }

    console.log(validRoles);
    console.log({ userRoles: user.roles });
    //throw new NotFoundException('No tienes permisos para acceder a esta ruta');
    throw new ForbiddenException(
      `El usuario ${user.fullName} No tiene permiso para acceder a esta ruta porque no se tiene el / los roles necesarios: "${validRoles}"`,
    );
  }
}

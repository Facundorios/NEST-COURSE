import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidRoles } from '../interfaces';
import { RoleProctected } from './role-proctected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';

//Se crea una función Auth que recibe como parametro un array de roles validos.
export function Auth(...roles: ValidRoles[]) {
  //Se utiliza la función applyDecorators para aplicar los decoradores a la ruta.
  return applyDecorators(
    //Se utiliza el decorador UseGuards para proteger la ruta con el guard AuthGuard.
    RoleProctected(...roles),
    //Se utiliza el decorador UseGuards para proteger la ruta con el guard UserRoleGuard.
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}

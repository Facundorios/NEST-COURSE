import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, contexto: ExecutionContext) => {
    const request = contexto.switchToHttp().getRequest();
    const user = request.user;

    //En este caso,. se lanza un error 500 y no un 400, ya que el error es interno y no es un error del cliente.
    if (!user) throw new InternalServerErrorException('User not found');

    //Hacemos un condicional, en donde si el valor de data es igual a email, retornamos el email del usuario.

    // if (data == 'email') {
    //   const emailUser = request.user.email;
    //   return emailUser;
    // }

    //Retornamos el usuario completo en caso de que la data sea nula, de lo contrario retornamos el valor de la data. Esto se realiza mediante un operador ternario. los operadores ternarios son una forma de simplificar un if else. la siontaxis es la siguiente: condicion ? valor si es verdadero : valor si es falso. En este caso, si data es nulo, retornamos el usuario completo, de lo contrario retornamos el valor de la data.
    return !data ? user : user[data];
  },
);

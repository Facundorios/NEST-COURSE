import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data, contexto: ExecutionContext) => {
    const request = contexto.switchToHttp().getRequest();
    const user = request.user;

    //En este caso,. se lanza un error 500 y no un 400, ya que el error es interno y no es un error del cliente.
    if (!user) throw new InternalServerErrorException('User not found');

    // console.log({ data: data, context: contexto });
    return user;
  },
);

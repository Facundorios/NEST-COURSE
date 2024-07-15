import { Controller, Post, Body, Get, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';

import { GetUser, GetRawHeaders } from './decorators';
import { UserRoleGuard } from './guards/user-role/user-role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  registerUser(@Body() createUserdto: CreateUserDto) {
    return this.authService.create(createUserdto);
  }

  @Post('signin')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  //Utilizamos el decorador useGuards, el cual se utiliza para proteger las rutas de nuestra aplicación.
  @UseGuards(AuthGuard())
  probandoRutaPrivada(
    //Utilizamos el decorador Req para obtener la información de la petición.
    @Req() request: Express.Request,
    //Utilizamos el decorador GetUser para obtener la información del usuario que esta realizando la petición.
    @GetUser() user: User,
    //Utilizamos el decorador GetUser para obtener la información del usuario que esta realizando la petición.
    @GetUser('email') emailUser: string,
    //Utilizamos el decorador GetRawHeaders para obtener los headers de la petición.
    @GetRawHeaders() headers: string[],
  ) {
    //Este console.log nos mostrara la información del usuario que esta realizando la petición. Es decir, el usuario que esta logeado.
    //console.log({ request });
    // console.log({ user: request.user });
    return {
      message:
        'Esta es una ruta protegida, si ves este mensaje es porque estas logeado',
      //user: user,
      user,
      emailUser,
      headers,
    };
  }

  @Get('private2')
  //Se utiliza el decorador SetMetadata para asignar los roles validos que pueden acceder a la ruta.
  @SetMetadata('roles',['admin', 'super-user'])
  //Utilizamos el decorador useGuards, el cual se utiliza para proteger las rutas de nuestra aplicación. Este decorador se puede utilizar en el controlador o en la ruta. Funciona de la siguiente manera: Si se utiliza en el controlador, todas las rutas del controlador estarán protegidas. Si se utiliza en la ruta, solo esa ruta estará protegida, independientemente de si el controlador tiene el decorador o no.
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoutes2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}

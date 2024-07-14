import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';

import { GetUser, GetRawHeaders } from './decorators';

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
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') emailUser: string,
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
}

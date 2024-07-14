import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';

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
    // @Req() request: Express.Request
    @GetUser() user: User,
  ) {
    //Este console.log nos mostrara la información del usuario que esta realizando la petición. Es decir, el usuario que esta logeado.
    console.log({ user });
    // console.log({ user: request.user });
    return {
      message:
        'Esta es una ruta protegida, si ves este mensaje es porque estas logeado',
      //user: user,
      user,
    };
  }
}

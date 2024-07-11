import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards( AuthGuard() )
  probandoRutaPrivada() {
    return 'ola';
  }
}

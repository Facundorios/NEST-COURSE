import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload, ValidRoles } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    //Inyectamos el repositorio de usuarios.
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //Definimos el repositorio de usuarios.

    private readonly jwtService: JwtService, //Definimos el servicio de JWT.
  ) {}

  //Creamos la funcion de registro de usuario que recibe como parametro el createUserDto.
  async create(createUserDto: CreateUserDto) {
    //Extraemos la contraseña del objeto createUserDto y el resto de los datos del usuario.
    try {
      const { password, ...restOfUserData } = createUserDto;

      //Creamos un nuevo usuario con los datos restantes y encriptamos la contraseña.
      const newUser = this.userRepository.create({
        ...restOfUserData,
        password: await bcrypt.hash(password, 10),
      });
      //Guardamos el nuevo usuario en la base de datos.
      await this.userRepository.save(newUser);

      //Retornamos el nuevo usuario.
      return {
        ...newUser,
        token: this.getJWToken({
          id: newUser.id,
        }),
      };
      //Autenticar: Generar el JWT que identifica al usuario
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  //Creamos la funcion de login que recibe como parametro el loginUserDto.
  async login(loginUserDto: LoginUserDto) {
    //Extraemos el email y la contraseña del objeto loginUserDto.
    try {
      const { email, password } = loginUserDto;
      //Buscamos al usuario en la base de datos por su email, seleccionando el email y la contraseña.
      const findUser = await this.userRepository.findOne({
        //Buscamos al usuario por su email.
        where: { email: email, },
        //Seleccionamos el email y la contraseña del usuario
        select: { email: true, password: true, id: true },
      });
      //Si no se encuentra al usuario, lanzamos una excepcion.
      if (!findUser) throw new UnauthorizedException(`Email incorrect`);
      //Si la contraseña no coincide con la contraseña encriptada del usuario, lanzamos una excepcion.
      if (!bcrypt.compareSync(password, findUser.password))
        throw new UnauthorizedException(`Password incorrect`);

      // console.log({findUser})

      //Retornamos el usuario con el JWT, que identifica al usuario.
      return {
        ...findUser,
        token: this.getJWToken({
          id: findUser.id,
        }),
      };
    } catch (error) {
      //Si no se encuentra al usuario, lanzamos una excepcion.
      this.handleDatabaseError(error);
    }
  }

  private getJWToken(payload: JwtPayload) {
    //Generamos el JWT con el payload.
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDatabaseError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(`${error.detail}`);
    }
    throw error;
  }
}

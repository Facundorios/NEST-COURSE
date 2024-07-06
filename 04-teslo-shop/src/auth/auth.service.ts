import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
      return newUser;
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
        where: { email: email },
        //Seleccionamos el email y la contraseña del usuario
        select: { email: true, password: true },
      });
      //Si no se encuentra al usuario, lanzamos una excepcion.
      if (!findUser) throw new UnauthorizedException(`Email incorrect`);
      //Si la contraseña no coincide con la contraseña encriptada del usuario, lanzamos una excepcion.
      if (!bcrypt.compareSync(password, findUser.password))
        throw new UnauthorizedException(`Password incorrect`);

      return findUser;
    } catch (error) {
      //Si no se encuentra al usuario, lanzamos una excepcion.
      this.handleDatabaseError(error);
    }
  }

  private handleDatabaseError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(`${error.detail}`);
    }
    throw error;
  }
}

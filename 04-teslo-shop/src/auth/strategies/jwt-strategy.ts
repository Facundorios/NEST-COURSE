import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
//Se crea la clase JwtStrategy que extiende de PassportStrategy, una función que recibe como parámetro la estrategia que se va a utilizar, en este caso Strategy de passport-jwt.
export class JwtStrategy extends PassportStrategy(Strategy) {
  //Se inyecta el repositorio de usuarios y el servicio de configuración.
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    configService: ConfigService,
  ) {
    //Se llama al constructor de la clase padre con un objeto que contiene la clave secreta y el token JWT.
    //Porque necesito poner Super? = Porque estoy extendiendo de PassportStrategy y necesito llamar al constructor de la clase padre.
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  //Se crea el método validate que recibe un payload de tipo JwtPayload y retorna un usuario,el jwtStrategy buscará la funcion con el nombre validate, en caso de no encontrarla y al querer acceder a una ruta privada, lanzará el error de "this.validate is not a "
  async validate(payload: JwtPayload): Promise<User> {
    //Se extrae el id del payload
    const { id } = payload;

    //Se busca el usuario en la base de datos por el id
    const user = this.userRepository.findOneBy({ id: id });
    //Se valida si el usuario existe
    if (!user) {
      throw new UnauthorizedException(`Token no valid`);
    }
    //Se valida si el usuario está activo
    if (!(await user).isActive) {
      throw new UnauthorizedException(`User is not active`);
    }
    console.log(user)

    return user;
  }
}

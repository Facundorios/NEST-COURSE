import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

//Se crea la clase JwtStrategy que extiende de PassportStrategy, una función que recibe como parámetro la estrategia que se va a utilizar, en este caso Strategy de passport-jwt.
export class JwtStrategy extends PassportStrategy(Strategy) {
  async validate(payload: JwtPayload): Promise<User> {

    const { email } = payload

    return;
  }
}

import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    //Utilizamos el modulo de JWT con el metodo registerAsync, para poder configurar el modulo de JWT.
    JwtModule.registerAsync({
      //Le pasamos el modulo de configuración.
      imports: [ ConfigModule ],
      //Le pasamos el servicio de configuración.
      inject: [ConfigService],
      //Le pasamos un objeto con la propiedad useFactory, la cual es una función que retorna un objeto con las propiedades secret y signOptions.
      useFactory: ( configService: ConfigService ) => {
        //console.log('JTW_SECRET', process.env.JWT_SECRET)
        return {
          //Le pasamos el secret, el cual es una variable de entorno que contiene la clave secreta para firmar el token.
          secret: configService.get('JWT_SECRET') || 'secretKey',
          //Le pasamos el signOptions, el cual es un objeto con la propiedad expiresIn, la cual es el tiempo de expiración del token.
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
  ],
})
export class AuthModule {}

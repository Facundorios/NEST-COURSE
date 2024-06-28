import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { DefaultEnvironmentsValues } from './config/app.config';

@Module({
  imports: [
    //COnfigmodule es un modulo que permite cargar las variables de entorno de un archivo .env, en donde se utiliza el metodo forRoot, que recibe un objeto de configuracion, en donde se utiliza la propiedad load, que recibe un arreglo de funciones, en donde se carga la funcion DefaultEnvironmentsValues.
    ConfigModule.forRoot({
      //La propiedad load es la propiedad de la clase ConfigModule que permite cargar las variables de entorno de un archivo .env, en donde se utiliza el metodo forRoot, que recibe un objeto de configuracion, en donde se utiliza la propiedad load, que recibe un arreglo de funciones, en donde se carga la funcion DefaultEnvironmentsValues.
      load: [DefaultEnvironmentsValues],
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {
  // constructor() {
  //   console.log(process.env)
  // }
}

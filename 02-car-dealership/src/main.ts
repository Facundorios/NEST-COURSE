import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      //White list es la propiedad de la clase ValidationPipe que permite que solo los campos que esten definidos en el DTO sean aceptados.
      whitelist: true,
      //ForbidNonWhitelisted es la propiedad de la clase ValidationPipe que permite que si se envia un campo que no esta definido en el DTO, se rechace la peticion.
      //Si whitelist es true, entonces forbidNonWhitelisted es true, y viceversa.
      forbidNonWhitelisted: true
    })
  )

  await app.listen(3000);
}
bootstrap();

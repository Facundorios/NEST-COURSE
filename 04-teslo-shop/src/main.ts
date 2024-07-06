import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Servidor');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  //Utilizamos un global interceptor para serializar las respuestas de las peticiones. Le pasamos como argumento el app.get('Reflector'), esto quiere decir que estamos obteniendo el reflector de la aplicación.
  app.useGlobalInterceptors(new ClassSerializerInterceptor(
    app.get('Reflector')
  ));

  await app.listen(process.env.PORT);
  logger.log(`Servidor escuchando en: http//:localhost:${process.env.PORT}`);
}
bootstrap();

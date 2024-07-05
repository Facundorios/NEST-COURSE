import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileNamer, fileFilter } from './helpers';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('product/:imageName')
  findeOneImage(
    //El decorador Res sirve para devolver un archivo estático, en el momento en que lo utilizamos, la aplicación no va a devolver nada y va a esperar una respuesta.
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {
    //Se obtiene el path de la imagen
    const path = this.filesService.getProductImage(imageName);

    //Se envia el archivo al cliente
    // res.status(403).json({
    //   ok: false,
    //   path: path,
    // });

    res.sendFile(path);
  }
  //Se crea un endpoint para subir una imagen de un producto
  @Post('product')
  //Se utiliza el decorador UseInterceptors para utilizar el FileInterceptor, el cual se encarga de subir el archivo al servidor
  @UseInterceptors(
    //Se le pasa el nombre del campo del archivo, el cual se encuentra en el body de la petición
    FileInterceptor('file', {
      //Se le pasa el filtro de archivos y el storage, el cual se encarga de guardar el archivo en el servidor
      fileFilter: fileFilter,
      //Se le pasa el destino y el nombre del archivo
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  )

  //Se crea la función para subir la imagen
  uploadProductImage(
    //Se obtiene el archivo subido
    @UploadedFile() file: Express.Multer.File,
  ) {
    //Se verifica si el archivo existe, en caso de que no exista, tirar un er
    if (!file) throw new BadRequestException('Archivo vacío / no compartible');
    //Se obtiene la URL segura de la imagen, la cual se va a utilizar para mostrar la imagen en el frontend.
    const secureURL = `${this.configService.get('HOST_API')}/api/files/product/${file.filename}`;
    //Se retorna la URL segura
    return { secureURL };
  }
}

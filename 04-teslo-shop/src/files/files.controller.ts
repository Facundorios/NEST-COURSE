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

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

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

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  )
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Archivo vacío / no compartible');

    const secureURL = `${file.filename}`;
    return { secureURL };
  }
}

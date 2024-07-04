import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')

  @UseInterceptors( FileInterceptor('archivo'))

  uploadProductImage(
    @UploadedFile() archivo: Express.Multer.File) {
    return archivo;
  }
}

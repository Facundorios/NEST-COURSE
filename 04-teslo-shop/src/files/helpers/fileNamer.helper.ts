import { BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

//En las carpetas helpers van funciones que son dedicadas a un solo modulo.
export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('archivo vacío.'), false);

  const fileExtension = file.mimetype.split('/')[1];
  if (!fileExtension) {
    throw new BadRequestException("The file hasn't a valid extension");
  }

  const fileName = `${uuid()}.${fileExtension}`;

  callback(null, fileName);
};

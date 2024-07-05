import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  //Se obtiene la imagen del producto
  getProductImage(imageName: string) {
    //Se crea el path fisico de donde se encuentra la imagen en el servidor.
    const path = join(__dirname, '../../static/products', imageName);
    //Se verifica si la imagen existe, si no existe se lanza una excepción. el existsSync es una función que verifica si un archivo existe en el path que se le pasa como argumento.
    if (!existsSync(path))
      throw new BadRequestException(
        `Not product found with imagen ${imageName}`,
      );

    //Se retorna el path de la imagen
    return path;
  }
}

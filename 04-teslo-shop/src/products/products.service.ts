import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

import { validate as isUUID } from 'uuid';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    //Inyectamos el repositorio de Product. Un repositorio es un objeto que se encarga de realizar operaciones de base de datos, como insertar, actualizar, eliminar y consultar registros.
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    //Creamos una propiedad privada llamada productRepository que es de tipo Repository<Product>, al Repository se le pasa como "tipo" la entidad que se va a manejar, en este caso Product
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      //Creamos una nueva instancia de Product con los datos que vienen en el DTO
      const newProduct = this.productRepository.create(createProductDto);
      //Guardamos el nuevo producto en la base de datos
      await this.productRepository.save(newProduct);

      return newProduct;
    } catch (error) {
      this.logger.error(error.message);
      this.handleDatabaseExceptions(error);
    }
  }

  async findAll(paginationdto: PaginationDTO) {
    try {
      //Desectructuramos del pagination dto las propiedades necesarias, en este caso,son el limit y el offset. Dentro de la misma desestructuración, le asignamos valores por defecto a limit y offset, en caso de que no vengan en la petición
      const { limit = 10, offset = 0 } = paginationdto;

      //Definimos allProducts, en donde se almacenan todos los productos de la base de datos, ordenados por el campo title de forma ascendente
      const allProducts = await this.productRepository.find({
        //Usamos la propeidad take, para indicar cuantos registros queremos obtener
        take: limit,
        //Usamos la propiedad skip, para indicar cuantos registros queremos saltar
        skip: offset,
        //TODO: relaciones
      });

      return allProducts;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(idOrSlug: string) {
    
    //Definimos una variable oneProduct, que es una varuiable de tipo Product
    let oneProduct: Product;
    //Si el idOrSlug es un UUID, entonces buscamos el producto por id, de lo contrario, lo buscamos por slug
    if (isUUID(idOrSlug)) {
      oneProduct = await this.productRepository.findOneBy({ id: idOrSlug });
    } else {
      oneProduct = await this.productRepository.findOneBy({ slug: idOrSlug });
    }

    if (!oneProduct) {
      throw new NotFoundException(
        `Product with id or slug ${idOrSlug} not found`,
      );
    }
    return oneProduct;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    //Forma #1
    // try {
    //   const deleteOneProduct = await this.productRepository.delete(id);
    //   return deleteOneProduct;
    // } catch (error) {
    //   console.log(error);
    // }

    //Forma #2
    try {
      const deleteOneProduct = await this.findOne(id);
      await this.productRepository.remove(deleteOneProduct);
    } catch (error) {
      console.log(error);
    }
  }

  private handleDatabaseExceptions(error: any) {
    //Manejos de errores.
    //Si el error es de tipo 23505, significa que se violó una restricción de unicidad en la base de datos, en este caso, la restricción de unicidad del campo slug
    if (error.code === '23505') throw new BadRequestException(error.detail);

    // this.logger.error(error.message)
    //Si el error no es de tipo 23505, lanzamos un error 500
    throw new InternalServerErrorException('Unexpected error, check logs');
  }
}

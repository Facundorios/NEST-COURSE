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

  async findAll() {
    try {
      //Definimos allProducts, en donde se almacenan todos los productos de la base de datos, ordenados por el campo title de forma ascendente
      const allProducts = await this.productRepository.find({
        order: { title: 'ASC' },
      });

      return allProducts;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    //Definimos OneProduct, en donde se almacena el producto que tenga el id que viene en la petición, si no existe, se lanza un error

    const OneProduct = await this.productRepository.findOneBy({ id: id });

    if (!OneProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return OneProduct;
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

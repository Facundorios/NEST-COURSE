import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';


@Injectable()
export class ProductsService {
  

  private handleDatabaseExceptions(error: any) {
    //Manejos de errores.
      //Si el error es de tipo 23505, significa que se violó una restricción de unicidad en la base de datos, en este caso, la restricción de unicidad del campo slug
      if (error.code === '23505') {
        throw new InternalServerErrorException(error.detail)
      }
      // this.logger.error(error.message)
      //Si el error no es de tipo 23505, lanzamos un error 500
      throw new InternalServerErrorException("Unexpected error, check logs")
  }

  private readonly logger = new Logger('ProdctsService')
  constructor(
    //Inyectamos el repositorio de Product. Un repositorio es un objeto que se encarga de realizar operaciones de base de datos, como insertar, actualizar, eliminar y consultar registros.
    @InjectRepository(Product)
    //Creamos una propiedad privada llamada productRepository que es de tipo Repository<Product>, al Repository se le pasa como "tipo" la entidad que se va a manejar, en este caso Product
    private readonly productRepository: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto) {
    

    try {
      
      //Creamos una nueva instancia de Product con los datos que vienen en el DTO
      const newProduct = this.productRepository.create(createProductDto)
      //Guardamos el nuevo producto en la base de datos
      await this.productRepository.save(newProduct)
      return newProduct

    } catch (error) {
      this.handleDatabaseExceptions(error)
    }


  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

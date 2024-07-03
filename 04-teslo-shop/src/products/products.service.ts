import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { validate as isUUID } from 'uuid';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { Product, ProductImage } from './entities';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    //Inyectamos el repositorio de Product. Un repositorio es un objeto que se encarga de realizar operaciones de base de datos, como insertar, actualizar, eliminar y consultar registros.
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    //Creamos una propiedad privada llamada productRepository que es de tipo Repository<Product>, al Repository se le pasa como "tipo" la entidad que se va a manejar, en este caso Product

    //Inyectamos el repositorio de ProductImage:
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    //Creamos una propiedad privada llamada productImage que es de tipo Repository<ProductImage>, al Repository se le pasa como "tipo" la entidad que se va a manejar, en este caso ProductImage
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      //El elemento rest en la desestructuración debe ser el ultimo en llamarse
      const { images = [], ...productDetails } = createProductDto;
      //Creamos una nueva instancia de Product con los datos que vienen en el DTO
      const newProduct = this.productRepository.create({
        ...productDetails,
        //Mapeamos las imagenes que vienen en el Ddstancia de ProductImage con la url de la imagen
        images: images.map((image) =>
          this.productImageRepository.create({ url: image }),
        ),
      });
      //Guardamos el nuevo producto en la base de datos
      await this.productRepository.save(newProduct);

      return { ...newProduct, images: images };
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
        relations: {
          //Relacion: Un producto puede tener muchas imágenes:
          images: true,
        },
      });

      return allProducts.map(({ images, ...rest }) => ({
        //Mapeamos los productos, y retornamos un objeto con las propiedades del producto, y adicionalmente, le asignamos a la propiedad images, las imagenes del producto
        ...rest,
        //Mapeamos las imagenes del producto, y retornamos un arreglo con unicamente las url de las imagenes
        images: images.map((images) => images.url),
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(property: string) {
    //Definimos una variable oneProduct, que es una varuiable de tipo Product
    let oneProduct: Product;
    //Si el property es un UUID, entonces buscamos el producto por id, de lo contrario, lo buscamos por slug
    if (isUUID(property)) {
      oneProduct = await this.productRepository.findOneBy({ id: property });
    } else {
      //oneProduct = await this.productRepository.findOneBy({ slug: property });

      //Definimos queryBuilder (constructor de query), que es una instancia de QueryBuilder, que es una clase que nos permite construir consultas SQL de forma programática, es decir, sin escribir SQL directamente.
      const queryBuilder = this.productRepository.createQueryBuilder('product');

      //En el oneProduct utilizamos el queryBuilder, en donde utilizamos el metodo where, al cual le pasamos una cadena de texto en donde el titulo es igual al titulo o el slug igual al slug, esto ya que posteriormente se definen esas 2 propiedades a modo de objeto, y su valor en ambos casos es el de property. Adicionalmente, se utiliza el metodo getOne, para obtener un solo registro.Destacar el hecho que usamos el metodo UPPER para convertir el titulo a mayúsculas, por lo que la búsqueda no será case sensitive
      oneProduct = await queryBuilder
        .where('UPPER(title) = :title or slug = :slug ', {
          title: property.toUpperCase(),
          slug: property.toLowerCase(),
        })
        //Se utiliza el metodo leftJoinAndSelect, para hacer un join con la tabla images, y se utiliza el metodo getOne, para obtener un solo registro.
        .leftJoinAndSelect('product.images', 'images')
        .getOne();
    }

    if (!oneProduct) {
      throw new NotFoundException(
        `Product with id or slug ${property} not found`,
      );
    }
    return oneProduct;
  }

  async findOnePlane(property: string) {
    //Creamos una variable property, que es de tipo string, y le asignamos el valor de la propiedad que viene en la petición, dentor de la misma, desestructuramos la propiedad de imagen, que en su valor por defecto es un arreglo vacío, y el resto de propiedades por separado utilizando el operador rest.
    //Urtilizamos el metodo findeOne para traer el resto de funciones.
    const { images = [], ...restOfProperty } = await this.findOne(property);
    //retornamos un objeto con las propiedades del producto, y adicionalmente, le asignamos a la propiedad images, las imagenes del producto, que son mapeadas para que traigan unicamente la url
    return {
      ...restOfProperty,
      images: images.map((images) => images.url),
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    //Se define el updateProducto y dentro del mismo se utiliza el productRepository con el metodo preload, el cual se encarga de cargar un producto de la base de datos, con los datos que vienen en el DTO, en este caso, se carga el producto con el id que viene en la petición, y se le asignan los valores que vienen en el DTO
    const updateProduct = await this.productRepository.preload({
      id: id,
      ...updateProductDto,
      images: [],
    });

    if (!updateProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    try {
      await this.productRepository.save(updateProduct);
      return updateProduct;
    } catch (error) {
      this.handleDatabaseExceptions(error);
    }
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

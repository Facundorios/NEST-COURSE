import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() paginationdto: PaginationDTO) {
    console.log(paginationdto);
    return this.productsService.findAll(paginationdto);
  }

  @Get(':property')
  //Para el caso de buscar un producto por id, no utilizaremos el ParseUUIDPipe, ya que se podrá buscar el producto mediante el uuid, o tambien mediante el slug. Por lo que el get tendrá el lugar de un ':id' o un ':slug', tendrá un ':property'
  findOne(@Param('property') property: string) {
    return this.productsService.findOnePlane(property);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}

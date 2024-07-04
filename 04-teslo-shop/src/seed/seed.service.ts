import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';


@Injectable()
export class SeedService {

  constructor(
    private readonly productsServices: ProductsService
  ) {}

  async runSeed() {
    await this.productsServices.removeAllProducts()
    
  }

}

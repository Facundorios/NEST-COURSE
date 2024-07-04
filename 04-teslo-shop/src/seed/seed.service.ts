import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/data-seed';

@Injectable()
export class SeedService {
  constructor(private readonly productsServices: ProductsService) {}

  async runSeed() {
    await this.productsServices.removeAllProducts();

    const allProducts = initialData.products;

    const insertPromises = [];

    allProducts.forEach((product) => {
      insertPromises.push(this.productsServices.create(product));
    });

    const resultados = await Promise.all(insertPromises);
    return resultados;
  }
}

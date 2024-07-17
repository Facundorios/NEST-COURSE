import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductImage } from './entities';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    //Importo el modulo de TypeOrm con el metodo forFeature,el cual recibe un array de entidades,
    TypeOrmModule.forFeature([Product, ProductImage]),
    AuthModule
  ],
  //#2: Y lo siguiente que tengo que hacer es dejar en el apartado de exports los modulos necesarios que quiero que pasar a otro modulo.
  exports: [ProductsService],
})
export class ProductsModule {}

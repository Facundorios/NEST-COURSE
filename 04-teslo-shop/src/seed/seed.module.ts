import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  //#1 Si quiero importar un controlador o provider desde otro moludo, lo que tengo que hacer es importar el modulo en cuestion como primer paso. (Ir al ProductsModule ) 
  imports: [ProductsModule, AuthModule]
})
export class SeedModule {}

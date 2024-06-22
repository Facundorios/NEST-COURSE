import { Module } from '@nestjs/common';
import { SeedsService } from './seed.service';
import { SeedsController } from './seed.controller';
import { CarsModule } from 'src/cars/cars.module';
import { BrandsModule } from 'src/brands/brands.module';

@Module({
  controllers: [SeedsController],
  providers: [SeedsService],
  imports: [CarsModule, BrandsModule],
})
export class SeedsModule {}

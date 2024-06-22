import { Injectable } from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';
import { CARS_SEED } from './data/cars.seed';
import { BrandsService } from 'src/brands/brands.service';
import { BRANDS_SEED } from './data/brands.seed';


@Injectable()
export class SeedsService {


  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService
  ) {}


  populateDatabase() {

    this.carsService.fillCarsWithSeedData(CARS_SEED)
    this.brandsService.fillBrandsWithDataSeed(BRANDS_SEED)

    return "The database has been populated with seed data."

  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';

//Importacion mediante un "index.ts": si creo un archivo index.ts en la carpta dto, puedo importar todos los archivos de la carpeta con una sola linea de codigo, en este caso se importan los archivos CreateCarDto y UpdateCarDto, que estan dentro de la carpeta dto, y se exportan en el archivo index.ts.
import { CreateCarDto, UpdateCarDto } from './dto';


import { urlToHttpOptions } from 'url';

//Se utiliza el decorador controller y se le pasa como argumento 'cars', esto quiere decir que todas las rutas que se definan en este controlador van a tener como prefijo /cars
@Controller('cars')
// @UsePipes(/* Aquí va el decorador de validación */ ValidationPipe)

//Se crea la clase carscontroller
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  //Se crea un metodo que retorna todos los autos con el decorador Get, este metodo se va a ejecutar cuando se haga una peticion GET a la ruta /cars
  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  //Se crea un metodo que retorna un auto por su id, se utiliza el decorador Get y se le pasa como argumento la ruta /:id, esto quiere decir que se va a recibir un parametro en la ruta, en el getCarById se utiliza el decorador params, y se le pasa como argumento 'id', esto quiere decir que se va a recibir un parametro llamado id
  // @Get('/:id')
  // getCarById(@Param('id') id) {
  //   return this.cars[id] || "Not found"
  // }

  @Get('/:id')
  //Se crea un metodo que retorna un auto por su id, se utiliza el decorador Get y se le pasa como argumento la ruta /:id, esto quiere decir que se va a recibir un parametro en la ruta, en el getCarById se utiliza el decorador params, y se le pasa como argumento 'id', esto quiere decir que se va a recibir un parametro llamado id
  //dado que en el param solo hay tipo string, se debe de castear el id a number usando el signo + antes de id
  getCarByID(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    console.log({ id });

    return this.carsService.findOneById(id);
  }

  @Post()
  createCar(@Body() createCarDTO: CreateCarDto) {
    // console.log('New car created:');
    // console.log(createCarDTO);
    return this.carsService.createCar(createCarDTO);
  }

  @Patch('/:id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    
    return updateCarDto;
  }

  @Delete('/:id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return `Car with id ${id} has been deleted`;
  }
}

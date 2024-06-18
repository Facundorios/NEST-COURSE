import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interface/car.interface';
import { v4 as uudi } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

//Dentro de los archivos services denest estan dentro la logica de "negocio", que despues la debemos de "inyectar" en otros lugares del código.
//
@Injectable()
export class CarsService {
  //Se crea un arreglo de autos
  private cars: Car[] = [
    {
      id: uudi(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uudi(),
      brand: 'Ford',
      model: 'Fiesta',
    },
    {
      id: uudi(),
      brand: 'Chevrolet',
      model: 'Onix',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    //Se busca el auto por su id, se utiliza el metodo find, que recibe una funcion como argumento, esta funcion recibe un auto y retorna true si el id del auto es igual al id que se recibe como argumento
    const car = this.cars.find((car) => car.id == id);
    console.log(this.cars);
    if (!car)
      throw new NotFoundException(
        'Auto no encontrado. El id que ha ingresado no pertenece a ningun auto',
      );

    return car;
  }

  //Se crea un metodo que recibe un objeto de tipo CreateCarDto, este metodo se va a encargar de crear un auto, se utiliza el decorador Post, y se le pasa como argumento la ruta /, esto quiere decir que se va a recibir una peticion POST en la ruta /, en el createCar se utiliza el decorador Body, y se le pasa como argumento 'createCarDto', esto quiere decir que se va a recibir un objeto de tipo CreateCarDto.
  //En el metodo createCar se crea un nuevo auto, se le asigna un id con el metodo uudi, y se le asignan las propiedades del objeto createCarDto, luego se agrega el auto al arreglo de autos, y se retorna el auto creado
  createCar(createCarDto: CreateCarDto) {
    const newCar = {
      id: uudi(),
      ...createCarDto,
    };
    this.cars.push(newCar);
    return newCar
  }
  //Se crea un metodo que recibe un id y un objeto de tipo UpdateCarDto, este metodo se va a encargar de actualizar un auto, se utiliza el decorador Patch, y se le pasa como argumento la ruta /:id, esto quiere decir que se va a recibir un parametro en la ruta, en el updateCar se utiliza el decorador params, y se le pasa como argumento 'id', esto quiere decir que se va a recibir un parametro llamado id, tambien se utiliza el decorador Body, y se le pasa como argumento 'updateCarDto', esto quiere decir que se va a recibir un objeto de tipo UpdateCarDto
  update (id: string, updateCarDto: UpdateCarDto) {
    
  }
}

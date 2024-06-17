import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interface/car.interface';
import { v4 as uudi } from 'uuid'

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
    console.log(this.cars)
    if (!car) throw new NotFoundException('Auto no encontrado. El id que ha ingresado no pertenece a ningun auto');

    return car;
  }
}

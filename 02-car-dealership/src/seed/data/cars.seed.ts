import { Car } from "src/cars/interface/car.interface"
import { v4 as uuid } from "uuid"

export const CARS_SEED: Car[] = [
    {
        id: uuid(),   
        brand: 'Toyota',
        model: 'Corolla'
    }, 
    {
        id: uuid(),   
        brand: 'Honda',
        model: 'Civic'
    }, 
    {
        id: uuid(),   
        brand: 'Ford',
        model: 'Fiesta'
    }, 
    {
        id: uuid(),   
        brand: 'Nissan',
        model: 'Sentra'
    },
    {
        id: uuid(),   
        brand: 'Chevrolet',
        model: 'Spark'
    },
    {
        id: uuid(),   
        brand: 'Hyundai',
        model: 'Accent'
    },
    {
        id: uuid(),   
        brand: 'Kia',
        model: 'Rio'
    },
    {
        id: uuid(),   
        brand: 'Mazda',
        model: '3'
    },
    {
        id: uuid(),   
        brand: 'Volkswagen',
        model: 'Golf'
    },
    {
        id: uuid(),   
        brand: 'Subaru',
        model: 'Impreza'
    }
]
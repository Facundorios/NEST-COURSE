import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '.';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'text',
  })
  url: string;
  //Relación: Muchas imagenes pueden tener un mismo producto.
  @ManyToOne(
    //#1 Primer callback, se hace una función que devuelve el tipo Product
    () => Product,
    //#2 Segundo callback, se hace una función que retorna la relación inversa
    (product) => product.images,
    //Con la propiedad onDelete en 'cascade', le da la capacidad de la tabla principal (PRoduct) la capacidad de elimianr consigo los datos relacionados (En este caso, serian los product images que esten relacionadas con el id del producto eliminado. )
    { onDelete: 'CASCADE'}
  )
  product: Product;
}

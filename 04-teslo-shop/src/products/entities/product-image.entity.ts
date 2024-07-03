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
  )
  product: Product;
}

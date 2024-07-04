import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './';
@Entity({ name: 'products'})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  title: string;

  @Column('float', {
    default: 0,
  })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
    default: 'Aun no hay descripción de este producto.',
  })
  description: string;

  @Column({
    unique: true,
    nullable: true,
  })
  slug: string;

  @Column({
    type: 'int',
    default: 0,
  })
  stock: number;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
  })
  sizes: string[];

  @Column({
    type: 'text',
  })
  gender: string;

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  tags: string[];

  //Relacion: Un producto puede tener muchas imágenes:
  @OneToMany(
    //#1 Primer callback: se hace una función que retorna el tipo de entidad con la que se relaciona
    () => ProductImage,
    //#2 Segundo callback: se hace una función que retorna la relación inversa
    (productImage) => productImage.product,
    //#3 Tercer callback: se pasan las opciones de la relación, en este caso se pasa la opción cascade: true, lo que hace que si se elimina un producto, también se eliminen las imágenes asociadas a ese producto, y tambien añadimos el eager: true, para que las imágenes se carguen de forma automática
    { cascade: true, eager: true },
  )
  images?: ProductImage[];

  @BeforeInsert()
  generateSlug() {
    //Si no hay un slug, entonces el slug será igual al título
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", ' ');
  }

  //BeforeUpdate: Se ejecuta antes de que se actualice un registro
  @BeforeUpdate()
  transformSlug() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", ' ');
  }
}

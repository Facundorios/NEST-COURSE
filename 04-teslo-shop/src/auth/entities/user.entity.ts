import { Exclude } from 'class-transformer';
import { Product } from 'src/products/entities';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  //Se crea una columna de id, la cual es un string y se genera automaticamente, y el formato del id es de tipo uuid
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Exclude()
  @Column({
    type: 'text',
    select: false,
  })
  password: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  fullName: string;

  @Column({
    //Diferencia entre el 'boolean', y el 'bool': el 'bool' es un tipo de dato de postgres, mientras que el 'boolean' es un tipo de dato de javascript
    type: 'bool',
    default: false,
  })
  isActive: boolean;

  @Column({
    type: 'text',
    array: true,
    default: ['user'],
  })
  roles: string[];

  //Se crea una relacion de uno a muchos con la entidad Product
  @OneToMany(
    //Se hace una función que retorna el tipo de entidad con la que se relaciona
    () => Product,
    //Se hace una función que retorna la entidad con la que se relaciona
    (product) => product.user,
  )
  product: Product;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  emailToLowerCaseOnUpdate() {
    this.emailToLowerCase();
  }

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

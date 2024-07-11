import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
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

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
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

import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @BeforeInsert()
  generateSlug() {
    this.slug = this.title
      .toLowerCase()
      .replace(/ /g, '_')
      .replaceAll(' - ', '_');
  }
}
const ropa = [
  {
    title: "Botas Negras",
    description: "Unas Botas de Trabajo",
    sizes: ["40", "41", "42"],
    gender: "men",
    price: 150.99,
  },
  {
    title: "Camisa Blanca",
    description: "Una camisa formal de algodón",
    sizes: ["S", "M", "L", "XL"],
    gender: "men",
    price: 49.99,
  },
  {
    title: "Vestido Rojo",
    description: "Un vestido elegante de noche",
    sizes: ["XS", "S", "M", "L"],
    gender: "women",
    price: 89.99,
  },
  {
    title: "Jeans Azul",
    description: "Pantalones vaqueros ajustados",
    sizes: ["28", "30", "32", "34"],
    gender: "women",
    price: 59.99,
  },
  {
    title: "Sudadera Gris",
    description: "Sudadera cómoda para el invierno",
    sizes: ["M", "L", "XL"],
    gender: "unisex",
    price: 39.99,
  },
  {
    title: "Chaqueta de Cuero",
    description: "Chaqueta de cuero auténtico",
    sizes: ["M", "L", "XL"],
    gender: "men",
    price: 199.99,
  },
  {
    title: "Falda Plisada",
    description: "Falda plisada de estilo casual",
    sizes: ["S", "M", "L"],
    gender: "women",
    price: 45.99,
  },
  {
    title: "Traje de Baño",
    description: "Traje de baño de una pieza",
    sizes: ["S", "M", "L"],
    gender: "women",
    price: 35.99,
  },
  {
    title: "Gorra Deportiva",
    description: "Gorra ajustable para deportes",
    sizes: ["Única"],
    gender: "unisex",
    price: 19.99,
  },
  {
    title: "Polo Azul",
    description: "Camisa polo casual",
    sizes: ["S", "M", "L", "XL"],
    gender: "men",
    price: 29.99,
  },
];

import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { BeforeInsert } from 'typeorm';



export class CreateProductDto {
  @IsString()
  @MinLength(5)
  description?: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price: number;

  //Con la propiedad de IsString() "each", puedo hacer que cada uno de los elementos del array sean de tipo string
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @IsString()
  @IsString()
  @MinLength(5)
  @IsOptional()
  slug?: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @MinLength(5)
  title: string;

  @IsIn(['men', 'women', 'kid', 'unisex'])
  @IsString()
  gender: string;

  @IsString()
  type: string;

  //BeforeInsert: Se ejecuta antes de insertar un registro en la base de datos.
  //BeforeUpdate: Se ejecuta antes de actualizar un registro en la base de datos.

  // @BeforeInsert()
  // checkSlugInsert() {
  //   if (!this.slug) {
  //     this.slug = this.title;
  //   }
  //   this.slug = this.slug
  //     .toLowerCase()
  //     .replaceAll(' ', '_')
  //     .replaceAll("'", '');
  // }

}

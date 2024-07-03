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
  title: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price: number;

  @IsString()
  @MinLength(5)
  description?: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  slug?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  //Con la propiedad de IsString() "each", puedo hacer que cada uno de los elementos del array sean de tipo string
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @IsIn(['men', 'women', 'other'])
  @IsString()
  gender: string;

  @IsString({ each: true})
  @IsArray()
  @IsOptional()
  tags: string[]


  @IsString({ each: true})
  @IsArray()
  @IsOptional()
  images?: string[]
  //BeforeInsert: Se ejecuta antes de insertar un registro en la base de datos.
  //BeforeUpdate: Se ejecuta antes de actualizar un registro en la base de datos.

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}

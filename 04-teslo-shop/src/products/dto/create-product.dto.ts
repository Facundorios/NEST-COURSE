import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

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
  sizes: string[];

  @IsIn(['men', 'women', 'other'])
  @IsString()
  gender: string;
}

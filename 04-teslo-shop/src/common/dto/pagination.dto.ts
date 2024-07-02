import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDTO {

  @IsOptional()
  @IsPositive()
  
  // El decorador Type de la librería class-transformer se utiliza para especificar el tipo de dato que se espera en la propiedad. Esto es similar a la configuración global de EnableImplicitConversion en el módulo de validación de clase, con la principal diferencia de que Type solo se aplica a la propiedad decorada.
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  // No podemos utilziar el decorador @IsPositive() en el offset, debido a que el 0 no esta definido como un número positivo, si en caso de que el cliente no manda un offset, el valor predeterminado será 0, y entonces ocurre un choque entre el decorador @IsPositive() y el valor predeterminado
  @Min(0)
  @Type(() => Number)
  offset?: number;
}

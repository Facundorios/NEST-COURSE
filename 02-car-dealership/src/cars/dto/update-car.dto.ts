import { IsOptional, IsString, IsUUID, MinLength, isUUID } from "class-validator"
import { UUID } from "crypto"

export class UpdateCarDto {

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?: string

    @IsString()
    @MinLength(3)
    @IsOptional()

    readonly brand?: string

    @IsString()
    @MinLength(3)
    @IsOptional()

    readonly model?: string

}
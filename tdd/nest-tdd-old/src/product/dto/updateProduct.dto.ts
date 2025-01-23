import { AutoMap } from "@automapper/classes"
import { Optional } from "@nestjs/common"
import { IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class UpdateProductDto {

    @IsOptional()
    @AutoMap()
    @IsString({ message: 'Should be a valid name.' })
    @MinLength(
        4,
        { message: 'Minimum 4 characters' }
    )
    name?: string
    
    @IsOptional()
    @AutoMap()
    @IsNumber({}, { message: 'Should be a valid price.' })
    price?: number
    
    @IsOptional()
    @AutoMap()
    @IsNumber({}, { message: 'Should be a valid quantity.' })
    quantity?: number
}
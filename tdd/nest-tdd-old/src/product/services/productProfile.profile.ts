import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "../dto/createProduct.dto";
import { ProductEntity } from "../entities/product.entity";



@Injectable()
export class ProductProfile extends AutomapperProfile {

    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper)
    }


    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, CreateProductDto, ProductEntity)
        }
    }


}
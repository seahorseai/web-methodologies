import { CreatePostChildEntityDto } from "./create-postChildEntity.dto";

export class CreatePostRootEntityDto {

    name: string;

    columns?: Array<any>;

    entitiesChild?: Array<CreatePostChildEntityDto>
}
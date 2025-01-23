import { CreatePostRootEntityDto } from "./create-post-rootEntity.dto";

export class CreatePostAggregateDto {
    name: string;

    postRootEntity: CreatePostRootEntityDto;
}

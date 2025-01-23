import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IsArray, IsString } from "class-validator";
import { HydratedDocument } from 'mongoose';
import { PostChildEntity } from "./post.child-entity.model";
import * as mongoose from 'mongoose';

export type AggregateDocument = HydratedDocument<PostRootEntity>;

@Schema()
export class PostRootEntity {

    @Prop()
    @IsString()
    name: string;

    @Prop(Array)
    @IsArray()
    columns?: Array<string & boolean & number>;

    @Prop([PostChildEntity])
    @IsArray()
    postChildEntities?: Array<PostChildEntity>;

}

export const RootEntitySchema = SchemaFactory.createForClass(PostRootEntity)
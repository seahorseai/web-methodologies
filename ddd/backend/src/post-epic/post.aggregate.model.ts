import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { PostRootEntity } from "./post.root-entity.model";
import { HydratedDocument } from "mongoose";
import * as mongoose from 'mongoose';
import { Type } from "class-transformer";
import { IsOptional, IsString } from 'class-validator';

export type AggregateDocument = HydratedDocument<PostAggregateSchema>;
@Schema()
export class PostAggregateSchema {

    @Prop({ required: true })
    @IsString()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PostRootEntity', required: false })
    @IsOptional()
    @Type(() => PostRootEntity)
    postRootEntity?: PostRootEntity;
}

export const AggregateSchema = SchemaFactory.createForClass(PostAggregateSchema)
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IsArray, IsObject, IsString } from "class-validator";
import { HydratedDocument } from 'mongoose';
//  
export type AggregateDocument = HydratedDocument<PostChildEntity>;

@Schema()
export class PostChildEntity {

    @Prop()
    @IsString()
    name: string;

    @Prop()
    @IsArray()
    columns?: Array<string & boolean & number>;

    // @Prop([{ null: true, type: Array<ValueObject> }])
    // @IsObject()
    // valueObject?: Array<ValueObject>;

}

export const ChildEntitySchema = SchemaFactory.createForClass(PostChildEntity)
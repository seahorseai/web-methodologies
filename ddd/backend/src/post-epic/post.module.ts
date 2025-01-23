import { PostService } from './create-post-user-story/post.service';
import { Module, Post } from '@nestjs/common';
import { PostController } from './create-post-user-story/post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostAggregateSchema, AggregateSchema } from './post.aggregate.model';
import { PostRootEntity, RootEntitySchema } from './post.root-entity.model';

@Module({
  imports: [MongooseModule.forFeature(
    [{ name: PostAggregateSchema.name, schema: AggregateSchema },
    { name: PostRootEntity.name, schema: RootEntitySchema }
    ])
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule { }
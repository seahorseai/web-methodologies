import { PostAggregateSchema } from '../post.aggregate.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostAggregateDto } from './create-post.dto';
import { UpdatePostAggregateDto } from './create-post-user-story/update-post.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PostRootEntity } from '../post.root-entity.model';

@Injectable()
export class PostService {

  constructor(
    @InjectModel(PostAggregateSchema.name) private postAggregateModel: Model<PostAggregateSchema>,
    @InjectModel(PostRootEntity.name) private postRootEntityModel: Model<PostRootEntity>
  ) { }

  async createAggregate({ postRootEntity, ...createPostAggregateDto }: CreatePostAggregateDto) {
    // With the spread operator we take the other remaining attributes
    try {
      console.log(postRootEntity, createPostAggregateDto);

      if (postRootEntity) {
        const createdRootEntity = new this.postRootEntityModel(postRootEntity)
        const savedRootEntity = await createdRootEntity.save()
        const createdAggregate = new this.postAggregateModel({
          ...createPostAggregateDto,
          postRootEntity: savedRootEntity._id,
        });

        return await createdAggregate.save()
      } else {
        const createdAggregate = new this.postAggregateModel({ ...createPostAggregateDto })

      }

    } catch (error) {
      throw new BadRequestException({ 'error': error })
    }
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostAggregateDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

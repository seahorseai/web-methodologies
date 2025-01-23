import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controller/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductProfile } from './services/productProfile.profile';
import { ProductEntity } from './entities/product.entity';
@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductProfile
  ],
  imports: [TypeOrmModule.forFeature([ProductEntity])]
})
export class ProductModule { }

import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product/entities/product.entity';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    ProductModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes()
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'myuser',
      password: '1234',
      database: 'seahorse',
      entities: ["dist/**/*.entity.js"],
      synchronize: true,
    }),

  ],
})
export class AppModule { }

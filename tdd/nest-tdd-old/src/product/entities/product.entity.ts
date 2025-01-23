import { AutoMap } from '@automapper/classes';
import { IsNumber, IsString, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductEntity {
  @AutoMap()
  @IsNumber({}, { message: 'Should be a valid id.' })
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @IsString({ message: 'Should be a valid name.' })
  @MinLength(4, { message: 'Minimum 4 characters' })
  @Column()
  name: string;

  @AutoMap()
  @IsNumber({}, { message: 'Should be a valid price.' })
  @Column({
    type: "double"
})
  price: number;

  @AutoMap()
  @IsNumber({}, { message: 'Should be a valid quantity.' })
  @Column()
  quantity: number;
}


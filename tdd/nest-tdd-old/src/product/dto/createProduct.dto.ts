import { AutoMap } from '@automapper/classes';
import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @AutoMap()
  @IsNumber({}, { message: 'Should be a valid id.' })
  id: number;

  @AutoMap()
  @IsString({ message: 'Should be a valid name.' })
  @MinLength(4, { message: 'Minimum 4 characters' })
  name: string;

  @AutoMap()
  @IsNumber({}, { message: 'Should be a valid price.' })
  price: number;

  @AutoMap()
  @IsNumber({}, { message: 'Should be a valid quantity.' })
  quantity: number;
}

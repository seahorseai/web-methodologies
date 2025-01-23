import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from './createProduct.dto';
import { validate, ValidationError } from 'class-validator';

describe('CreateProductDto', () => {
  it('should create a new instance without errors', async () => {
    const data = {
      id: 1,
      name: 'coca-cola',
      price: 1.5,
      quantity: 10,
    };
    const createProductDto = plainToInstance(CreateProductDto, data);
    const errors = await validate(createProductDto);
    console.log(errors);

    expect(errors.length).toBe(0);
  });

  it('should return a error for a invalid format name', async () => {
    const data = {
      id: 1,
      name: 183,
      price: 1.5,
      quantity: 10,
    };
    const createProductDto = plainToInstance(CreateProductDto, data);
    const errors = await validate(createProductDto);
    expect(stringified(errors)).toContain('Should be a valid name');
  });

  it('should return a errors for all invalid fomat values', async () => {
    const data = {
      id: '1',
      name: 212,
      price: 'Fanta',
      quantity: 'Juan',
    };

    const errors = [
      'Should be a valid id.',
      'Should be a valid name.',
      'Should be a valid price.',
      'Should be a valid quantity.',
    ];

    const createProductDto = plainToInstance(CreateProductDto, data);
    const errorsDto = await validate(createProductDto);
    console.log(errorsDto);

    errors.forEach((error, i) => {
      const constraintsValues = Object.values(errorsDto[i].constraints);
      expect(constraintsValues).toContain(error);
    });
  });

  it('should return a error of a repeated id', async () => {
    const firstProduct = {
      id: 2,
      name: 212,
      price: 'Fanta',
      quantity: 'Juan',
    };

    const secondProduct = {
      id: 2,
      name: 'Lays',
      price: 4.5,
      quantity: 12,
    };

    const firstCreateProductDto = plainToInstance(
      CreateProductDto,
      firstProduct,
    );
    const secondCreateProductDto = plainToInstance(
      CreateProductDto,
      secondProduct,
    );
    let error: string;
    if (firstCreateProductDto.id === secondCreateProductDto.id) {
      error = 'This product with this id already exists.';
    }
    expect(error).toEqual('This product with this id already exists.');
  });
});

export function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors);
}

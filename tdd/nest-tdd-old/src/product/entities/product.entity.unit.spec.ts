import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ProductEntity } from "./product.entity";
import { ValidationError } from "@nestjs/common";
import { error } from "console";

describe("Product Entity", () => {
  it("should create a new instance without errors", async () => {
    const data = {
      id: 1,
      name: "coca-cola",
      price: 1.5,
      quantity: 10,
    };


    const productEntity = plainToInstance(ProductEntity, data);
    const errors = await validate(productEntity);
    console.log(errors);

    expect(errors.length).toBe(0);
  });
  it

  it("should return a error for a invalid format name", async () => {
    const data = {
      id: 1,
      name: 183,
      price: 1.5,
      quantity: 10,
    };
    const productEntity = plainToInstance(ProductEntity, data);
    const errors = await validate(productEntity);
    expect(stringified(errors)).toContain("Should be a valid name");
  });

  it('should return an error for a invalid format price', async () => {
    const data = {
      id: 1,
      name: 'palta',
      price: 'rebaja',
      quantity: 10,
    }
    const productEntity = plainToInstance(ProductEntity, data);
    const error = await validate(productEntity);
    expect(stringified(error)).toContain("Should be a valid price");
  })

  it('should return an error for an invald quantity', async () => {
    const data = {
      id: 1,
      name: 'tamales',
      price: 3,
      quantity: '25',
    }
    const productEntity = plainToInstance(ProductEntity, data);
    const error = await validate(productEntity);
    expect(stringified(error)).toContain("Should be a valid quantity");

  })
  

  it("should return a errors for all invalid fomat values", async () => {
    const data = {
      id: "1",
      name: 212,
      price: "Fanta",
      quantity: "Juan",
    };

    const errors = [
      "Should be a valid id.",
      "Should be a valid name.",
      "Should be a valid price.",
      "Should be a valid quantity.",
    ];

    const productEntity = plainToInstance(ProductEntity, data);
    const errorsDto = await validate(productEntity);
    console.log(errorsDto);

    errors.forEach((error, i) => {
      const constraintsValues = Object.values(errorsDto[i].constraints);
      expect(constraintsValues).toContain(error);
    });
  });

  it('should return an error of a reapeated product but with different id', async () => {
    const firstProduct = {
      id: 2,
      name: "Fanta",
      price: 3,
      quantity: 30,
    }
    const secondProduct = {
      id: 5,
      name: "Fanta",
      price: 3,
      quantity: 12,
    }

    const firstProductEntity = plainToInstance(ProductEntity, firstProduct);
    const secondProductEntity = plainToInstance(ProductEntity, secondProduct);
    let error: string;
    if (firstProductEntity.name === secondProductEntity.name) {
      error = "This product with this name already exists with other id, look in the database";
    }
    expect(error).toEqual("This product with this name already exists with other id, look in the database");
    })

  it('should return an error if the product quantity given is negative', async () => {
    const data = {
      id: 1,
      name: 'palta',
      price: 3,
      quantity: -10,
    }
    let error: string;
    if(data.quantity < 0){
      error = "Should be a valid quantity";
    }
    expect(error).toEqual("Should be a valid quantity");

  })
  

  it("should return a error of a repeated id", async () => {
    const firstProduct = {
      id: 2,
      name: 212,
      price: "Fanta",
      quantity: "Juan",
    };

    const secondProduct = {
      id: 2,
      name: "Lays",
      price: 4.5,
      quantity: 12,
    };

    const firstProductEntity = plainToInstance(ProductEntity, firstProduct);
    const secondProductEntity = plainToInstance(ProductEntity, secondProduct);
    let error: string;
    if (firstProductEntity.id === secondProductEntity.id) {
      error = "This product with this id already exists.";
    }
    expect(error).toEqual("This product with this id already exists.");
  });
});

export function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors);
}

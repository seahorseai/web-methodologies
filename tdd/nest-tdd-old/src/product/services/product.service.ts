import { Injectable } from '@nestjs/common';

import { CreateProductDto } from '../dto/createProduct.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { validate } from 'class-validator';
import { UpdateProductDto } from '../dto/update.product.dto';



@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
        @InjectMapper() private readonly mapper: Mapper
    ) { }
    public index(): string {
        return 'Welcome to shop!';
    }

    public async listProducts(): Promise<any> {
        try {
            const products = await this.productRepository.find()
            if (products.length > 0 && products) {
                return {
                    success: true,
                    products: products,
                    status: 200
                }
            } else {
                return {
                    success: true,
                    products: 'Not products',
                    status: 204
                }
            }
        } catch (e) {
            console.log('error: ', e);
            return {
                success: false,
                message: 'An error occurred while finding all the products',
                status: 404
            }
        }
    }

    public async findProductById(id: number): Promise<any> {
        try {
            const product = await this.productRepository.findOneBy({ id })
            if (product) {
                return {
                    product: product,
                    success: true,
                    status: 200
                }
            }
            return {
                success: false,
                status: 204
            }

        } catch (e) {
            console.log('error: ', e);
            return {
                message: 'An error occurred while finding the product',
                success: false,
                status: 500
            }
        }
    }

    public async createProduct(createProductDto: CreateProductDto): Promise<any> {

        try {
            const products = await this.productRepository.find();
            console.log(createProductDto);
            if (products.some((product) => product.name === createProductDto.name)) {
                return {
                    success: false,
                    status: 409,
                    message: 'This name product already exist'
                }
            }

            const productMap = this.mapper.map(createProductDto, CreateProductDto, ProductEntity);
            console.log("aqui pasa");
            console.log("Mapeado", productMap);

            if (productMap) {
                console.log(productMap);
                // console.log(productMap);
                await this.productRepository.save(productMap)
                return {
                    product: productMap,
                    success: true,
                    status: 200
                }
            }

        } catch (e) {
            return {
                success: false,
                message: 'An error occurred while creating the product',
                status: 500
            }
        }
    }

    public async removeProduct(id: number): Promise<any> {
        try {
            
            const productToRemove = await this.productRepository.findOneBy({ id });
            console.log(id);
            console.log(productToRemove);

            if (!productToRemove) {
                return {
                    success: false,
                    message: `Product with id:${id} doesn't exist`,
                    status: 204
                };

            } else {
                if (await this.productRepository.remove(productToRemove)) {
                    return {
                        product: productToRemove,
                        success: true,
                        message: `Product with id:${id} removed`,
                        status: 200
                    }
                }
            }
        } catch (e) {
            console.log('Error:', e);
            return {
                success: false,
                message: 'An error occurred while removing the product',
                status: 500
            };
        }


    }

    public async updateProduct(id: number, product: Partial<UpdateProductDto>): Promise<any> {
        const productToUpdate = await this.findProductById(id)
        const errors = await validate(product)

        console.log(id);
        console.log(product);

        // Do the validate...

        try {
            if (productToUpdate) {
                const productUpdated = await this.productRepository
                    .update(id, { name: product.name, price: product.price, quantity: product.quantity })
                if (productUpdated) {
                    return {
                        product: productUpdated,
                        success: true,
                        status: 200
                    }
                }
            }
        } catch (e) {
            console.log('Error: ', e);
            return {
                success: false,
                message: 'An error occurred while updating the product.',
                status: 500
            }
        }

        return
    }

    public async updateSeveralProducts(products: CreateProductDto[]) {

    }
}

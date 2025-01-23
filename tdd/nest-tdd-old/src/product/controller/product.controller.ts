import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/createProduct.dto';
import { UpdateProductDto } from '../dto/updateProduct.dto';

@Controller('product')
export class ProductController {

  constructor(private readonly productService: ProductService) { }



  @Get()
  public index() {
    return this.productService.index();
  }

  @Get('list')
  public listProducts() {
    return this.productService.listProducts()
  }
  @Get(':id')
  public findProductById(id: number) {
    return this.productService.findProductById(id)
  }

  @Post()
  public async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Delete(':id')
  public removeProduct(@Param() id: number) {
    return this.productService.removeProduct(id)
  }

  @Patch(':id')
  public updateProduct(@Param() id: number, @Body() product: UpdateProductDto) {
    return this.productService.updateProduct(id, product)
  }


}

import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Repository } from 'typeorm';


describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<ProductEntity>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
      imports: [
        TypeOrmModule.forFeature([ProductEntity]),
        AutomapperModule.forRoot({
          strategyInitializer: classes()
        }),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '1234',
          database: 'seahorse',
          entities: ["dist/**/*.entity.js"],
          autoLoadEntities: true,
          synchronize: true,
        }),
      ]
    }).compile();

    repository = module.get('ProductEntityRepository');
    service = module.get<ProductService>(ProductService);
  });

  afterEach(async () => {
    await repository.query('DELETE FROM product_entity')
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listProducts', () => {
    it('should return an array of products', async () => {
      const product1: ProductEntity = {
        id: 1,
        name: 'Munchitos',
        price: 2.00,
        quantity: 43
      }
      const product2: ProductEntity = {
        id: 2,
        name: 'Coca-cola',
        price: 1.40,
        quantity: 34
      }
      await repository.save([product1, product2])

      const allProducts = await service.listProducts()
      console.log(allProducts.products);

      expect(allProducts.products).toHaveLength(2)
      expect(allProducts.products[0]).toEqual(product1)
      expect(allProducts.products[1]).toEqual(product2)

    })
  })

  describe('findProductById', () => {
    it('should find a Product by Id', async () => {
      const product: ProductEntity = {
        id: 3,
        name: 'Queso',
        price: 2.00,
        quantity: 43
      }
      await repository.save(product);

      const productSearch = await service.findProductById(product.id)
      expect(productSearch.product).toEqual(product);
    })

    it('shouldnt find a Product', async () => {
      const productSearch = await service.findProductById(99)
      expect(productSearch).toBeNull;
    })
  })

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const product: ProductEntity = {
        id: 4,
        name: 'Queso',
        price: 2.00,
        quantity: 43
      }

      const productCreated = await service.createProduct(product);
      const productSearch = await service.findProductById(product.id);
      expect(productSearch.product).toEqual(productCreated.product);
    })

    describe('updateProduct', () => {
      it('should update the product', async () => {
        const oldProduct: ProductEntity = {
          id: 5,
          name: 'Casio',
          price: 17.00,
          quantity: 15
        }

        const newProduct: ProductEntity = {
          id: 5,
          name: 'Casio',
          price: 15.00,
          quantity: 8
        }
        const id = newProduct.id;

        await repository.save(oldProduct);
        const productUpdated = await service.updateProduct(id, newProduct)
        expect(newProduct).not.toBe(oldProduct)
        console.log(productUpdated.product);
        expect(productUpdated.product["affected"]).toEqual(1);
        const newProductSearch = await service.findProductById(id)
        expect(newProductSearch.product).toEqual(newProduct)

      })

    })

    describe('removeProduct', () => {
      it('should remove the product', async () => {
        const productToRemove: ProductEntity = {
          id: 6,
          name: 'T-shirt',
          price: 7.00,
          quantity: 50
        }

        await repository.save(productToRemove);
        const id = productToRemove.id
        const searchProductToRemove = await service.findProductById(id)
        console.log(searchProductToRemove);
        expect(searchProductToRemove.product).toEqual(productToRemove)
        const a = await service.removeProduct(id);
        expect(await repository.findOneBy({ id })).toBeNull()
      })

    })

  })


});

// describe('updateProduct', () => {
//     it("should update a product by id and return a product", () => {
//       // Data for update the product
//       const updatedProduct: Partial<ProductType> = {
//         name: 'RedBull',
//         price: 2.3
//       }
//       // Product to update
//       const productToUpdate = products[2];

//       jest.spyOn(productService, 'updateProduct')
//         // Controlamos el comportamiento de la función
//         .mockImplementation((id: number, newProduct: Partial<ProductType>) => {
//           return {
//             ...productToUpdate,
//             ...newProduct
//           }
//         })

//       const result = productService.updateProduct(productToUpdate.id, updatedProduct)

//       expect(productService.updateProduct).toHaveBeenCalledWith(productToUpdate.id, updatedProduct)
//       expect(result.name).toBe(updatedProduct.name)
//       expect(result.price).toBe(updatedProduct.price)

//       jest.spyOn(productService, 'listProducts').mockReturnValue(products.filter(product => product.name !== productToUpdate.name));
//       // Check if the product dont exist in the list
//       expect(productController.listProducts()).not.toContain(productToUpdate)

//     })
//   })
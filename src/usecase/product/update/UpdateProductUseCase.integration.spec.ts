import { Sequelize } from 'sequelize-typescript'
import ProductFactory from '../../../domain/product/factory/ProductFactory'
import ProductModel from '../../../infrastructure/product/repository/sequelize/ProductModel'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/ProductRepository'
import UpdateProductUseCase from './UpdateProductUseCase'

describe('Integration tests for update product use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('should update a product', async () => {
    const productRepository = new ProductRepository()

    const product = ProductFactory.createWithoutType('Product 1', 100)
    await productRepository.create(product)

    const updateProductUseCase = new UpdateProductUseCase(productRepository)

    const input = { id: product.id, name: 'Product 1 Updated', price: 2100 }

    const output = await updateProductUseCase.execute(input)

    expect(output).toEqual(input)
  })

  test('should throw an error when product not found', async () => {
    const productRepository = new ProductRepository()

    const updateProductUseCase = new UpdateProductUseCase(productRepository)

    const input = { id: '2', name: 'Product 1 Updated', price: 2100 }

    await expect(updateProductUseCase.execute(input)).rejects.toThrowError(`Product with id ${input.id} not found`)
  })
})

import { Sequelize } from 'sequelize-typescript'
import ProductFactory from '../../../domain/product/factory/ProductFactory'
import ProductModel from '../../../infrastructure/product/repository/sequelize/ProductModel'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/ProductRepository'
import FindProductUseCase from './FindProductUseCase'

describe('Integration tests for find product use case', () => {
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

  test('should find a product', async () => {
    const productRepository = new ProductRepository()

    const product = ProductFactory.createWithoutType('Product 1', 100)
    await productRepository.create(product)

    const findProductUseCase = new FindProductUseCase(productRepository)

    const input = { id: product.id }

    const output = await findProductUseCase.execute(input)

    expect(output).toEqual({ id: product.id, name: product.name, price: product.price })
  })

  test('should throw an error when product not found', async () => {
    const productRepository = new ProductRepository()

    const findProductUseCase = new FindProductUseCase(productRepository)

    const input = { id: '123' }

    await expect(findProductUseCase.execute(input)).rejects.toThrow('Product 123 not found')
  })
})

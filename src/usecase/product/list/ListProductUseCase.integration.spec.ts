import { Sequelize } from 'sequelize-typescript'
import ProductFactory from '../../../domain/product/factory/ProductFactory'
import ProductModel from '../../../infrastructure/product/repository/sequelize/ProductModel'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/ProductRepository'
import ListProductUseCase from './ListProductUseCase'

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

  test('should list products', async () => {
    const productRepository = new ProductRepository()

    const product1 = ProductFactory.createWithoutType('Product 1', 100)
    const product2 = ProductFactory.createWithoutType('Product 2', 200)

    await productRepository.create(product1)
    await productRepository.create(product2)

    const listProductUseCase = new ListProductUseCase(productRepository)
    const output = await listProductUseCase.execute()

    expect(output.products.length).toBe(2)
    expect(output.products[0].id).toBe(product1.id)
    expect(output.products[0].name).toBe(product1.name)
    expect(output.products[0].price).toBe(product1.price)
    expect(output.products[1].id).toBe(product2.id)
    expect(output.products[1].name).toBe(product2.name)
    expect(output.products[1].price).toBe(product2.price)
  })
})

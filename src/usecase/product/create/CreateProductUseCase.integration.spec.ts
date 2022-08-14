import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequelize/ProductModel'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/ProductRepository'
import CreateProductUseCase from './CreateProductUseCase'

const makeCreateProductUseCase = (): CreateProductUseCase => {
  const productRepository = new ProductRepository()
  const createProductUseCase = new CreateProductUseCase(productRepository)

  return createProductUseCase
}

describe('Integration tests for create product use case', () => {
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

  test('should create a product', async () => {
    const createProductUseCase = makeCreateProductUseCase()

    const input = { name: 'Product 1', price: 10 }

    const output = await createProductUseCase.execute(input)

    expect(output).toBeDefined()
    expect(output.id).toBeDefined()
    expect(output.name).toBe(input.name)
    expect(output.price).toBe(input.price)
  })

  test('should throw an error when name is not provided', async () => {
    const createProductUseCase = makeCreateProductUseCase()

    const input = { name: '', price: 10 }

    await expect(createProductUseCase.execute(input)).rejects.toThrowError('Product name is required')
  })

  test('should throw an error whein price is less or equal to zero', async () => {
    const createProductUseCase = makeCreateProductUseCase()

    const input1 = { name: 'Product 1', price: 0 }
    const input2 = { name: 'Product 2', price: -1 }

    await expect(createProductUseCase.execute(input1)).rejects.toThrowError('Product price must be greater than zero')
    await expect(createProductUseCase.execute(input2)).rejects.toThrowError('Product price must be greater than zero')
  })
})

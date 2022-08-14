import ProductFactory from '../../../domain/product/factory/ProductFactory'
import IProductRepository from '../../../domain/product/repository/IProductRepository'
import ListProductUseCase from './ListProductUseCase'

const product1 = ProductFactory.createWithoutType('Product 1', 100)

const product2 = ProductFactory.createWithoutType('Product 2', 200)

const mockProductRepository = (): IProductRepository => {
  return {
    findById: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn()
  }
}

const makeListProductUseCase = (): ListProductUseCase => {
  const productRepository = mockProductRepository()
  return new ListProductUseCase(productRepository)
}

describe('Unit tests for list product usecase', () => {
  test('should return a list of products', async () => {
    const listProductUseCase = makeListProductUseCase()
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

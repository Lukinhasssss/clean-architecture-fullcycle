import ProductFactory from '../../../domain/product/factory/ProductFactory'
import IProductRepository from '../../../domain/product/repository/IProductRepository'
import FindProductUseCase from './FindProductUseCase'

const product = ProductFactory.createWithoutType('Product 1', 100)

const makeFindProductUseCase = (): FindProductUseCase => {
  const productRepository = mockProductRepository()
  const findProductUseCase = new FindProductUseCase(productRepository)

  return findProductUseCase
}

const mockProductRepository = (): IProductRepository => {
  return {
    create: jest.fn(),
    findById: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit tests for find product usecase', () => {
  test('should find a product', async () => {
    const findProductUseCase = makeFindProductUseCase()

    const input = { id: product.id }

    const output = await findProductUseCase.execute(input)

    expect(output).toEqual({ id: product.id, name: product.name, price: product.price })
  })

  test('should throw an error when product not found', async () => {
    const productRepository = mockProductRepository()

    jest.spyOn(productRepository, 'findById')
      .mockImplementation(() => { throw new Error(`Product ${product.id} not found`) })

    const findProductUseCase = new FindProductUseCase(productRepository)

    const input = { id: product.id }

    await expect(findProductUseCase.execute(input)).rejects.toThrow(`Product ${product.id} not found`)
  })
})

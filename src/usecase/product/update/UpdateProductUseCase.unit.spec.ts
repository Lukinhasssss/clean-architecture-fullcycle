import ProductFactory from '../../../domain/product/factory/ProductFactory'
import IProductRepository from '../../../domain/product/repository/IProductRepository'
import { InputUpdateProductDto } from './UpdateProductDto'
import UpdateProductUseCase from './UpdateProductUseCase'

const product = ProductFactory.createWithoutType('Product 1', 100)

const makeInput = (): InputUpdateProductDto => {
  return {
    id: product.id,
    name: 'Product 1 Updated',
    price: 2100
  }
}

const mockProductRepository = (): IProductRepository => {
  return {
    findById: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

const makeUpdateProductUseCase = (): UpdateProductUseCase => {
  const productRepository = mockProductRepository()
  return new UpdateProductUseCase(productRepository)
}

describe('Unit test for product update usecase', () => {
  test('should update a product', async () => {
    const updateProductUseCase = makeUpdateProductUseCase()

    const input = makeInput()
    const output = await updateProductUseCase.execute(input)

    expect(output).toEqual(input)
  })

  test('should throw an error when product not found', async () => {
    const productRepository = mockProductRepository()
    const updateProductUseCase = new UpdateProductUseCase(productRepository)

    const input = makeInput()
    input.id = '123'

    jest.spyOn(productRepository, 'findById')
      .mockImplementation(() => { throw new Error(`Product with id ${input.id} not found`) })

    await expect(updateProductUseCase.execute(input)).rejects.toThrow(`Product with id ${input.id} not found`)
  })
})

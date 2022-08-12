import Product from '../entity/Product'
import ProductB from '../entity/ProductB'
import ProductFactory from './ProductFactory'

describe('Product factory unit tests', () => {
  test('should create a product', () => {
    const product = ProductFactory.create('A', 'Product A', 10)

    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product A')
    expect(product.price).toBe(10)
    expect(product).toBeInstanceOf(Product)
    expect(product.constructor.name).toBe('Product')
  })

  test('should create a product B', () => {
    const product = ProductFactory.create('B', 'Product B', 10)

    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product B')
    expect(product.price).toBe(20)
    expect(product).toBeInstanceOf(ProductB)
  })

  test('should throw an error when product type is not provided', () => {
    expect(() => ProductFactory.create('', 'Product', 10)).toThrowError('Product type is required')
  })

  test('should throw an error when product type is not supported', () => {
    expect(() => ProductFactory.create('C', 'Product', 10)).toThrowError("Product type 'C' is not supported")
  })
})

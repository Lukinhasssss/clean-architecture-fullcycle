import Product from './Product'

describe('Product unit tests', () => {
  test('should throw an error when id is empty', () => {
    expect(() => new Product('', 'Product 1', 100)).toThrowError('Product id is required')
  })

  test('should throw an error when name is empty', () => {
    expect(() => new Product('1', '', 100)).toThrowError('Product name is required')
  })

  test('should throw an error when price is less or equal zero', () => {
    expect(() => new Product('1', 'Product 1', 0)).toThrowError('Product price must be greater than zero')
    expect(() => new Product('1', 'Product 1', -1)).toThrowError('Product price must be greater than zero')
  })

  test('should change name', () => {
    const product = new Product('1', 'Product 1', 100)
    product.changeName('Product 2')

    expect(product.name).toBe('Product 2')
  })

  test('should throw an error if try to change name passing an empty value', () => {
    const product = new Product('1', 'Product 1', 100)
    expect(() => product.changeName('')).toThrowError('Product name is required')
  })

  test('should change price', () => {
    const product = new Product('1', 'Product 1', 100)
    product.changePrice(200)

    expect(product.price).toBe(200)
  })

  test('should throw an error if try to change price passing an vaue less or equal zero', () => {
    const product = new Product('1', 'Product 1', 100)
    expect(() => product.changePrice(0)).toThrowError('Product price must be greater than zero')
    expect(() => product.changePrice(-1)).toThrowError('Product price must be greater than zero')
  })
})

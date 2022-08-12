import { Sequelize } from 'sequelize-typescript'
import Product from '../../../../domain/product/entity/Product'
import ProductModel from './ProductModel'
import ProductRepository from './ProductRepository'

describe('Product repository tests', () => {
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
    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 100)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: '1' } })

    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 100
    })
  })

  test('should update a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 100)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: '1' } })

    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 100
    })

    product.changeName('Product 2')
    product.changePrice(200)

    await productRepository.update(product)

    const productModel2 = await ProductModel.findOne({ where: { id: '1' } })

    expect(productModel2.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 2',
      price: 200
    })
  })

  test('should find a product by id', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 100)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: '1' } })
    const foundProduct = await productRepository.findById('1')

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price
    })
  })

  test('should find all products', async () => {
    const productRepository = new ProductRepository()
    const product1 = new Product('1', 'Product 1', 100)
    const product2 = new Product('2', 'Product 2', 200)

    await productRepository.create(product1)
    await productRepository.create(product2)

    const products = [product1, product2]
    const foundProducts = await productRepository.findAll()

    expect(products).toEqual(foundProducts)
  })
})

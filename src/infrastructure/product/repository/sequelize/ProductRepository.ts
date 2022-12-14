import Product from '../../../../domain/product/entity/Product'
import IProductRepository from '../../../../domain/product/repository/IProductRepository'
import ProductModel from './ProductModel'

export default class ProductRepository implements IProductRepository {
  async create (entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    })
  }

  async update (entity: Product): Promise<void> {
    await ProductModel.update({
      name: entity.name,
      price: entity.price
    }, {
      where: {
        id: entity.id
      }
    })
  }

  async findById (id: string): Promise<Product> {
    let productModel

    try {
      productModel = await ProductModel.findOne({ where: { id }, rejectOnEmpty: true })
    } catch (error) {
      throw new Error(`Product with id ${id} not found`)
    }

    return new Product(
      productModel.id,
      productModel.name,
      productModel.price
    )
  }

  async findAll (): Promise<Product[]> {
    const productModels = await ProductModel.findAll()

    return productModels.map(productModel => new Product(
      productModel.id,
      productModel.name,
      productModel.price
    ))
  }
}

import ProductFactory from '../../../domain/product/factory/ProductFactory'
import IProductRepository from '../../../domain/product/repository/IProductRepository'
import { InputCreateProductDto, OutputCreateProductDto } from './CreateProductDto'

export default class CreateProductUseCase {
  constructor (private readonly productRepository: IProductRepository) {}

  async execute (input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.createWithoutType(input.name, input.price)

    await this.productRepository.create(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}

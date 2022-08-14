import ProductRepository from '../../../infrastructure/product/repository/sequelize/ProductRepository'
import { InputUpdateProductDto, OutputUpdateProductDto } from './UpdateProductDto'

export default class UpdateProductUseCase {
  constructor (private readonly productRepository: ProductRepository) {}

  async execute (input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.productRepository.findById(input.id)
    product.changeName(input.name)
    product.changePrice(input.price)

    await this.productRepository.update(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}

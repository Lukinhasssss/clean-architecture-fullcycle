import ProductRepository from '../../../infrastructure/product/repository/sequelize/ProductRepository'
import { InputFindProductDto, OutputFindProductDto } from './FindProductDto'

export default class FindProductUseCase {
  constructor (private readonly productRepository: ProductRepository) {}

  async execute (input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.productRepository.findById(input.id)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}

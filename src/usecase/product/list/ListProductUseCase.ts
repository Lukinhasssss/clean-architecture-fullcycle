import Product from '../../../domain/product/entity/Product'
import IProductRepository from '../../../domain/product/repository/IProductRepository'
import { OutputListProductDto } from './ListProductDto'

export default class ListProductUseCase {
  constructor (private readonly productRepository: IProductRepository) {}

  async execute (): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll()
    return OutputMapper.toOutput(products)
  }
}

class OutputMapper {
  static toOutput (product: Product[]): OutputListProductDto {
    const products = product.map(product => ({ id: product.id, name: product.name, price: product.price }))

    return { products }
  }
}

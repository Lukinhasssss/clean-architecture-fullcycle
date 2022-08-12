import { v4 as uuid } from 'uuid'
import IProduct from '../entity/IProduct'
import Product from '../entity/Product'
import ProductB from '../entity/ProductB'

export default class ProductFactory {
  static create (type: string, name: string, price: number): IProduct {
    switch (type) {
      case 'A':
        return new Product(uuid(), name, price)
      case 'B':
        return new ProductB(uuid(), name, price)
      default:
        if (!type)
          throw new Error('Product type is required')
        throw new Error(`Product type '${type}' is not supported`)
    }
  }
}

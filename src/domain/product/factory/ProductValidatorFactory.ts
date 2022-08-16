import IValidator from '../../@shared/validator/IValidator'
import Product from '../entity/Product'
import ProductYupValidator from '../validator/ProductYupValidator'

export default class ProductValidatorFactory {
  public static create (): IValidator<Product> {
    return new ProductYupValidator()
  }
}

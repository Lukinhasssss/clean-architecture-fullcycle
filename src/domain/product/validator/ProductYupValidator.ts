import IValidator from '../../@shared/validator/IValidator'
import Product from '../entity/Product'
import * as yup from 'yup'

export default class ProductYupValidator implements IValidator<Product> {
  public validate (entity: Product): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required('Product id is required'),
        name: yup.string().required('Product name is required'),
        price: yup.number().positive('Product price must be greater than zero')
      })

      schema.validateSync(entity, { abortEarly: false })
    } catch (errors) {
      const e = errors as yup.ValidationError

      e.inner.forEach(error => {
        entity.notification.addError({ context: 'product', message: error.message })
      })
    }
  }
}

import IValidator from '../../@shared/validator/IValidator'
import Customer from '../entity/Customer'
import * as yup from 'yup'

export default class CustomerYupValidator implements IValidator<Customer> {
  public validate (entity: Customer): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required('Customer id is required'),
        name: yup.string().required('Customer name is required')
      })

      schema.validateSync(entity, { abortEarly: false })
    } catch (errors) {
      const e = errors as yup.ValidationError

      e.inner.forEach(error => {
        entity.notification.addError({ context: 'customer', message: error.message })
      })
    }
  }
}

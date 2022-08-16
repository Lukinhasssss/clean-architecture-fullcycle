import IValidator from '../../@shared/validator/IValidator'
import Customer from '../entity/Customer'
import CustomerYupValidator from '../validator/CustomerYupValidator'

export default class CustomerValidatorFactory {
  public static create (): IValidator<Customer> {
    return new CustomerYupValidator()
  }
}

import CustomerFactory from '../../../domain/customer/factory/CustomerFactory'
import ICustomerRepository from '../../../domain/customer/repository/ICustomerRepository'
import Address from '../../../domain/customer/value-object/Address'
import { InputCreateCustomerDto, OutputCreateCustomerDto } from './CreateCustomerDto'

export default class CreateCustomerUseCase {
  private readonly customerRepository: ICustomerRepository

  constructor (customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository
  }

  async execute (input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.city,
        input.address.zipCode
      )
    )

    await this.customerRepository.create(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        zipCode: customer.address.zip
      }
    }
  }
}

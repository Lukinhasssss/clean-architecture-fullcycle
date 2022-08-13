import ICustomerRepository from '../../../domain/customer/repository/ICustomerRepository'
import Address from '../../../domain/customer/value-object/Address'
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from './UpdateCustomerDto'

export default class UpdateCustomerUseCase {
  constructor (private readonly customerRepository: ICustomerRepository) {}

  async execute (input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.findById(input.id)
    customer.changeName(input.name)
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.city,
        input.address.zipCode
      )
    )

    await this.customerRepository.update(customer)

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

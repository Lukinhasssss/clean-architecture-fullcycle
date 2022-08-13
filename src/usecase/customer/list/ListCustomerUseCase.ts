import Customer from '../../../domain/customer/entity/Customer'
import ICustomerRepository from '../../../domain/customer/repository/ICustomerRepository'
import { InputListCustomerDto, OutputListCustomerDto } from './ListCustomerDto'

export default class ListCustomerUseCase {
  constructor (private readonly customerRepository: ICustomerRepository) {}

  async execute (input?: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll()
    return OutputMapper.toOutput(customers)
  }
}

class OutputMapper {
  static toOutput (customer: Customer[]): OutputListCustomerDto {
    const customers = customer.map(customer => ({
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        zipCode: customer.address.zip
      }
    }))

    return { customers }
  }
}

import ICustomerRepository from '../../../domain/customer/repository/ICustomerRepository'
import { InputFindCustomerDto, OutputFindCustomerDto } from './FindCustomerDto'

export default class FindCustomerUseCase {
  private readonly customerRepository: ICustomerRepository

  constructor (customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository
  }

  async execute (input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.findById(input.id)

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

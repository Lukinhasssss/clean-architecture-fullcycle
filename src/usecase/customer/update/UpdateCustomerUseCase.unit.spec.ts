import CustomerFactory from '../../../domain/customer/factory/CustomerFactory'
import Address from '../../../domain/customer/value-object/Address'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/CustomerRepository'
import { InputUpdateCustomerDto } from './UpdateCustomerDto'
import UpdateCustomerUseCase from './UpdateCustomerUseCase'

const customer = CustomerFactory.createWithAddress(
  'Monkey D Luffy',
  new Address('Street', 1, 'City', 'Zip Code')
)

const makeInput = (): InputUpdateCustomerDto => {
  return {
    id: customer.id,
    name: 'Roronoa Zoro',
    address: {
      street: 'Street Updated',
      number: 2,
      city: 'City Updated',
      zipCode: 'Zip Code Updated'
    }
  }
}

const MockCustomerRepository = (): CustomerRepository => {
  return {
    findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

const makeUpdateCustomerUseCase = (): UpdateCustomerUseCase => {
  const customerRepository = MockCustomerRepository()
  return new UpdateCustomerUseCase(customerRepository)
}

describe('Unit test for customer update use case', () => {
  test('should update a customer', async () => {
    const updateCustomerUseCase = makeUpdateCustomerUseCase()

    const input = makeInput()
    const output = await updateCustomerUseCase.execute(input)

    expect(output).toEqual(input)
  })
})

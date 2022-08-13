import CustomerFactory from '../../../domain/customer/factory/CustomerFactory'
import ICustomerRepository from '../../../domain/customer/repository/ICustomerRepository'
import Address from '../../../domain/customer/value-object/Address'
import ListCustomerUseCase from './ListCustomerUseCase'

const customer1 = CustomerFactory.createWithAddress(
  'Monkey D Luffy',
  new Address('Street 1', 1, 'City 1', 'Zip Code 1')
)

const customer2 = CustomerFactory.createWithAddress(
  'Roronoa Zoro',
  new Address('Street 2', 2, 'City 2', 'Zip Code 2')
)

const MockCustomerRepository = (): ICustomerRepository => {
  return {
    findById: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn()
  }
}

const makeListCustomerUseCase = (): ListCustomerUseCase => {
  const customerRepository = MockCustomerRepository()
  return new ListCustomerUseCase(customerRepository)
}

describe('Unit tests for list customer use case', () => {
  test('should return a list of customers', async () => {
    const listCustomerUseCase = makeListCustomerUseCase()
    const output = await listCustomerUseCase.execute()

    expect(output.customers.length).toBe(2)
    expect(output.customers[0].id).toBe(customer1.id)
    expect(output.customers[0].name).toBe(customer1.name)
    expect(output.customers[0].address.street).toBe(customer1.address.street)
    expect(output.customers[0].address.number).toBe(customer1.address.number)
    expect(output.customers[0].address.city).toBe(customer1.address.city)
    expect(output.customers[0].address.zipCode).toBe(customer1.address.zip)
    expect(output.customers[1].id).toBe(customer2.id)
    expect(output.customers[1].name).toBe(customer2.name)
    expect(output.customers[1].address.street).toBe(customer2.address.street)
    expect(output.customers[1].address.number).toBe(customer2.address.number)
    expect(output.customers[1].address.city).toBe(customer2.address.city)
    expect(output.customers[1].address.zipCode).toBe(customer2.address.zip)
  })
})

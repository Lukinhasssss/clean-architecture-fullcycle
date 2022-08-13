import Customer from '../../../domain/customer/entity/Customer'
import Address from '../../../domain/customer/value-object/Address'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/CustomerRepository'
import FindCustomerUseCase from './FindCustomerUseCase'

// const MockCustomerRepository = (): CustomerRepository => {
//   return {
//     findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
//     findAll: jest.fn(),
//     create: jest.fn(),
//     update: jest.fn()
//   }
// }

const createCustomer = (): Customer => {
  const customer = new Customer('1', 'Monkey D Luffy')
  const address = new Address('Street', 1, 'City', 'Zip Code')
  customer.changeAddress(address)
  return customer
}

describe('Test find customer use case', () => {
  test('should find a customer', async () => {
    const customer = createCustomer()

    const customerRepository = new CustomerRepository()
    jest.spyOn(customerRepository, 'findById').mockReturnValue(Promise.resolve(customer))

    const findCustomerUseCase = new FindCustomerUseCase(customerRepository)

    const input = { id: '1' }

    const output = {
      id: '1',
      name: 'Monkey D Luffy',
      address: {
        street: 'Street',
        number: 1,
        city: 'City',
        zipCode: 'Zip Code'
      }
    }

    const result = await findCustomerUseCase.execute(input)

    expect(result).toEqual(output)
  })

  test('should throw an error when customer not found', async () => {
    const customerRepository = new CustomerRepository()
    jest.spyOn(customerRepository, 'findById').mockReturnValue(Promise.reject(new Error('Customer not found')))

    const findCustomerUseCase = new FindCustomerUseCase(customerRepository)

    const input = { id: '1' }

    await expect(findCustomerUseCase.execute(input)).rejects.toThrowError('Customer not found')
  })
})

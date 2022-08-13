import { Sequelize } from 'sequelize-typescript'
import Customer from '../../../domain/customer/entity/Customer'
import Address from '../../../domain/customer/value-object/Address'
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/CustomerModel'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/CustomerRepository'
import FindCustomerUseCase from './FindCustomerUseCase'

describe('Test find customer use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository)

    const customer = new Customer('1', 'Monkey D Luffy')
    const address = new Address('Street', 1, 'City', 'Zip Code')
    customer.changeAddress(address)
    await customerRepository.create(customer)

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
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository)

    const input = { id: '1' }

    await expect(findCustomerUseCase.execute(input)).rejects.toThrowError('Customer not found')
  })
})

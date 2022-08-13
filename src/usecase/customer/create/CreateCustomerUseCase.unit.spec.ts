import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/CustomerRepository'
import { InputCreateCustomerDto } from './CreateCustomerDto'
import CreateCustomerUseCase from './CreateCustomerUseCase'

const makeInput = (): InputCreateCustomerDto => {
  return {
    name: 'Monkey D Luffy',
    address: {
      street: 'Street',
      number: 1,
      city: 'City',
      zipCode: 'Zip Code'
    }
  }
}

const MockCustomerRepository = (): CustomerRepository => {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

const makeCreateCustomerUseCase = (): CreateCustomerUseCase => {
  const customerRepository = MockCustomerRepository()
  return new CreateCustomerUseCase(customerRepository)
}

describe('Unit test create customer use case', () => {
  test('should create a customer', async () => {
    const createCustomerUseCase = makeCreateCustomerUseCase()

    const input = makeInput()
    const output = await createCustomerUseCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zipCode: input.address.zipCode
      }
    })
  })

  test('should thrown an error when customer name is missing', async () => {
    const createCustomerUseCase = makeCreateCustomerUseCase()

    const input = makeInput()
    input.name = ''

    await expect(createCustomerUseCase.execute(input)).rejects.toThrowError('Customer name is required')
  })

  test('should thrown an error when address street is missing', async () => {
    const createCustomerUseCase = makeCreateCustomerUseCase()

    const input = makeInput()
    input.address.street = ''

    await expect(createCustomerUseCase.execute(input)).rejects.toThrowError('Address street is required')
  })

  test('should thrown an error when address number is missing', async () => {
    const createCustomerUseCase = makeCreateCustomerUseCase()

    const input = makeInput()
    input.address.number = undefined

    await expect(createCustomerUseCase.execute(input)).rejects.toThrowError('Address number is required')
  })

  test('should thrown an error when address city is missing', async () => {
    const createCustomerUseCase = makeCreateCustomerUseCase()

    const input = makeInput()
    input.address.city = ''

    await expect(createCustomerUseCase.execute(input)).rejects.toThrowError('Address city is required')
  })

  test('should thrown an error when address zip code is missing', async () => {
    const createCustomerUseCase = makeCreateCustomerUseCase()

    const input = makeInput()
    input.address.zipCode = ''

    await expect(createCustomerUseCase.execute(input)).rejects.toThrowError('Address zip is required')
  })
})

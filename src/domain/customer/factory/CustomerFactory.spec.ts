import Customer from '../entity/Customer'
import Address from '../value-object/Address'
import CustomerFactory from './CustomerFactory'

describe('Customer factory unit tests', () => {
  test('should create a customer', () => {
    const customer = CustomerFactory.create('Nami')

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('Nami')
    expect(customer.address).toBeUndefined()
  })

  test('should create a customer with an address', () => {
    const address = new Address('Rua dos Bobos', 10, 'São Paulo', '98765-432')
    const customer = CustomerFactory.createWithAddress('Nami', address)

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('Nami')
    expect(customer.address).toBeDefined()
    expect(customer.address.street).toBe('Rua dos Bobos')
    expect(customer.address.number).toBe(10)
    expect(customer.address.zip).toBe('98765-432')
    expect(customer.address.city).toBe('São Paulo')
  }
  )
})

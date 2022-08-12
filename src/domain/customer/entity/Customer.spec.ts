import Address from '../value-object/Address'
import Customer from './Customer'

describe('Customer unit tests', () => {
  test('should throw an error when id is empty', () => {
    expect(() => new Customer('', 'Roronoa Zoro')).toThrowError('Customer id is required')
  })

  test('should throw an error when name is empty', () => {
    expect(() => new Customer('1', '')).toThrowError('Customer name is required')
  })

  test('should change name', () => {
    const customer = new Customer('1', 'Roronoa Zoro')
    customer.changeName('Vinsmoke Sanji')
    expect(customer.name).toBe('Vinsmoke Sanji')
  })

  test('should throw an error if try to change name passing an empty value', () => {
    const customer = new Customer('1', 'Roronoa Zoro')
    expect(() => customer.changeName('')).toThrowError('Customer name is required')
  })

  test('should activate a customer', () => {
    const customer = new Customer('1', 'Roronoa Zoro')
    const address = new Address('Rua dos Bobos', 10, '98765-432', 'São Paulo')
    customer.changeAddress(address)

    customer.activate()

    expect(customer.isActive()).toBe(true)
  })

  test('should throw an error if try to activate a customer without address', () => {
    const customer = new Customer('1', 'Roronoa Zoro')
    expect(() => customer.activate()).toThrowError('Address is mandatory to activate customer')
  })

  test('should deactivate customer', () => {
    const customer = new Customer('1', 'Roronoa Zoro')

    customer.deactivate()

    expect(customer.isActive()).toBe(false)
  })

  test('should add reward points', () => {
    const customer = new Customer('1', 'Roronoa Zoro')
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(120)
    expect(customer.rewardPoints).toBe(120)

    customer.addRewardPoints(210)
    expect(customer.rewardPoints).toBe(330)
  })
})

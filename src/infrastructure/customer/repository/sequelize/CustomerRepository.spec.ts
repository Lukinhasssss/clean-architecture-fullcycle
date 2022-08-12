import { Sequelize } from 'sequelize-typescript'
import Customer from '../../../../domain/customer/entity/Customer'
import Address from '../../../../domain/customer/value-object/Address'
import CustomerModel from './CustomerModel'
import CustomerRepository from './CustomerRepository'

describe('Customer repository tests', () => {
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

  test('should create a customer', async () => {
    const customerRepository = new CustomerRepository()

    const customer = new Customer('1', 'Monkey D. Luffy')
    const address = new Address('Rua das Flores', 7, 'Onigashima', '74110-000')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Monkey D. Luffy',
      street: 'Rua das Flores',
      number: 7,
      city: 'Onigashima',
      zipcode: '74110-000',
      active: false,
      rewardPoints: 0
    })
  })

  test('should update a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('1', 'Monkey D. Luffy')
    const address = new Address('Rua das Flores', 7, 'Onigashima', '74110-000')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    customer.changeName('Vinsmoke Sanji')
    await customerRepository.update(customer)
    const customerModel = await CustomerModel.findOne({ where: { id: '1' } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: address.street,
      number: address.number,
      city: address.city,
      zipcode: address.zip,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints
    })
  })

  test('should find a customer by id', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('1', 'Monkey D. Luffy')
    const address = new Address('Rua das Flores', 7, 'Onigashima', '74110-000')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const customerResult = await customerRepository.findById(customer.id)

    expect(customerResult).toStrictEqual(customer)
  })

  test('should throw an error when customer is not found', async () => {
    const customerRepository = new CustomerRepository()

    await expect(customerRepository.findById('1')).rejects.toThrow('Customer not found')
  })

  test('should find all customers', async () => {
    const customerRepository = new CustomerRepository()

    const customer1 = new Customer('1', 'Monkey D. Luffy')
    const customer2 = new Customer('2', 'Nami')

    const address = new Address('Rua das Flores', 7, 'Onigashima', '74110-000')
    customer1.changeAddress(address)
    customer2.changeAddress(address)

    await customerRepository.create(customer1)
    await customerRepository.create(customer2)

    const customers = await customerRepository.findAll()

    expect(customers).toHaveLength(2)
    expect(customers[0]).toStrictEqual(customer1)
    expect(customers[1]).toStrictEqual(customer2)
    expect(customers).toContainEqual(customer1)
    expect(customers).toContainEqual(customer2)
  })
})

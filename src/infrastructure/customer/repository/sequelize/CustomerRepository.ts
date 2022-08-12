import Customer from '../../../../domain/customer/entity/Customer'
import ICustomerRepository from '../../../../domain/customer/repository/ICustomerRepository'
import Address from '../../../../domain/customer/value-object/Address'
import CustomerModel from './CustomerModel'

export default class CustomerRepository implements ICustomerRepository {
  async create (entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    })
  }

  async update (entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipcode: entity.address.zip,
        city: entity.address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints
      },
      { where: { id: entity.id } }
    )
  }

  async findById (id: string): Promise<Customer> {
    let customerModel

    try {
      customerModel = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true })
    } catch (error) {
      throw new Error('Customer not found')
    }

    const customer = new Customer(id, customerModel.name)
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.city,
      customerModel.zipcode
    )
    customer.changeAddress(address)
    return customer
  }

  async findAll (): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll()
    const customers = customerModels.map(customerModel => {
      const customer = new Customer(customerModel.id, customerModel.name)

      customer.addRewardPoints(customerModel.rewardPoints)

      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.city,
        customerModel.zipcode
      )
      customer.changeAddress(address)

      if (customerModel.active) customer.activate()

      return customer
    })
    return customers
  }
}

import express, { Request, Response } from 'express'
import CreateCustomerUseCase from '../../../usecase/customer/create/CreateCustomerUseCase'
import CustomerRepository from '../../customer/repository/sequelize/CustomerRepository'

export const customersRoute = express.Router()

customersRoute.post('/', async (request: Request, response: Response) => {
  const createCustomerUseCase = new CreateCustomerUseCase(new CustomerRepository())

  try {
    const { name, address } = request.body

    const customerDto = {
      name,
      address: {
        street: address.street,
        city: address.city,
        number: address.number,
        zipCode: address.zipCode
      }
    }

    const output = await createCustomerUseCase.execute(customerDto)

    response.status(201).send(output)
  } catch (error) {
    response.status(500).send(error)
  }
})

import express, { Request, Response } from 'express'
import CreateCustomerUseCase from '../../../usecase/customer/create/CreateCustomerUseCase'
import ListCustomerUseCase from '../../../usecase/customer/list/ListCustomerUseCase'
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

customersRoute.get('/', async (request: Request, response: Response) => {
  const listCustomerUseCase = new ListCustomerUseCase(new CustomerRepository())

  try {
    const output = await listCustomerUseCase.execute()
    response.status(200).send(output)
  } catch (error) {
    response.status(500).send(error)
  }
})

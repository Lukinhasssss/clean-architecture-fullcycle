import express, { Request, Response } from 'express'
import CreateProductUseCase from '../../../usecase/product/create/CreateProductUseCase'
import ListProductUseCase from '../../../usecase/product/list/ListProductUseCase'
import ProductRepository from '../../product/repository/sequelize/ProductRepository'

export const productsRoute = express.Router()

productsRoute.post('/', async (request: Request, response: Response) => {
  const createProductUseCase = new CreateProductUseCase(new ProductRepository())

  try {
    const { name, price } = request.body

    const productDto = {
      name,
      price
    }

    const output = await createProductUseCase.execute(productDto)

    response.status(201).send(output)
  } catch (error) {
    response.status(500).send(error)
  }
})

productsRoute.get('/', async (request: Request, response: Response) => {
  const listProductUseCase = new ListProductUseCase(new ProductRepository())

  try {
    const output = await listProductUseCase.execute()
    response.status(200).send(output)
  } catch (error) {
    response.status(500).send(error)
  }
})

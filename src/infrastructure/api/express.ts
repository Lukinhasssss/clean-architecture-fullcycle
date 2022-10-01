import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../customer/repository/sequelize/CustomerModel'
import ProductModel from '../product/repository/sequelize/ProductModel'
import { customersRoute } from './routes/customers.route'
import { productsRoute } from './routes/products.route'

export const app: Express = express()

app.use(express.json())

app.use('/customers', customersRoute)
app.use('/products', productsRoute)

export let sequelize: Sequelize

async function setupDb (): Promise<void> {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  })

  sequelize.addModels([CustomerModel, ProductModel])
  await sequelize.sync()
}

void setupDb()

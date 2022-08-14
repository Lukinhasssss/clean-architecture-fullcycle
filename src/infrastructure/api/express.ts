import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../customer/repository/sequelize/CustomerModel'
import { customersRoute } from './routes/customers.route'

export const app: Express = express()

app.use(express.json())
app.use('/customers', customersRoute)

export let sequelize: Sequelize

async function setupDb (): Promise<void> {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  })

  sequelize.addModels([CustomerModel])
  await sequelize.sync()
}

void setupDb()

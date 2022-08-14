import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E tests for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true }) // drops and re-creates db each time
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test('should create a customer', async () => {
    const response = await request(app)
      .post('/customers')
      .send({
        name: 'Monkey D Luffy',
        address: {
          street: 'Street',
          city: 'City',
          number: 1,
          zipCode: '09876-090'
        }
      })

    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined()
    expect(response.body.name).toBe('Monkey D Luffy')
    expect(response.body.address.street).toBe('Street')
    expect(response.body.address.city).toBe('City')
    expect(response.body.address.number).toBe(1)
    expect(response.body.address.zipCode).toBe('09876-090')
  })

  test('should not create a customer', async () => {
    const response = await request(app)
      .post('/customers')
      .send({ name: 'Monkey D Luffy' })

    expect(response.status).toBe(500)
  })

  test('should return a list of customers', async () => {
    await request(app)
      .post('/customers')
      .send({
        name: 'Monkey D Luffy',
        address: {
          street: 'Street',
          city: 'City',
          number: 1,
          zipCode: '09876-090'
        }
      })

    await request(app)
      .post('/customers')
      .send({
        name: 'Roronoa Zoro',
        address: {
          street: 'Street',
          city: 'City',
          number: 1,
          zipCode: '09876-090'
        }
      })

    const response = await request(app)
      .get('/customers')

    expect(response.status).toBe(200)
    expect(response.body.customers.length).toBe(2)

    const customer1 = response.body.customers[0]
    const customer2 = response.body.customers[1]

    expect(customer1.id).toBeDefined()
    expect(customer1.name).toBe('Monkey D Luffy')
    expect(customer1.address.street).toBe('Street')
    expect(customer1.address.city).toBe('City')
    expect(customer1.address.number).toBe(1)
    expect(customer1.address.zipCode).toBe('09876-090')
    expect(customer2.id).toBeDefined()
    expect(customer2.name).toBe('Roronoa Zoro')
    expect(customer2.address.street).toBe('Street')
    expect(customer2.address.city).toBe('City')
    expect(customer2.address.number).toBe(1)
    expect(customer2.address.zipCode).toBe('09876-090')
  })
})

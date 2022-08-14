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
})

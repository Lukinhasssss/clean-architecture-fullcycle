import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E tests for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true }) // drops and re-creates db each time
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test('should create a product', async () => {
    const response = await request(app)
      .post('/products')
      .send({
        name: 'Product 1',
        price: 100
      })

    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined()
    expect(response.body.name).toBe('Product 1')
    expect(response.body.price).toBe(100)
  })

  test('should not create a product', async () => {
    const response = await request(app)
      .post('/products')
      .send({ name: 'Product 1' })

    expect(response.status).toBe(500)
  })

  test('should return a list of products', async () => {
    await request(app)
      .post('/products')
      .send({
        name: 'Product 1',
        price: 100
      })

    await request(app)
      .post('/products')
      .send({
        name: 'Product 2',
        price: 200
      })

    const response = await request(app)
      .get('/products')

    expect(response.status).toBe(200)
    expect(response.body.products.length).toBe(2)
  })
})

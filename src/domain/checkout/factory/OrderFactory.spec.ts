import { v4 as uuid } from 'uuid'
import Order from '../entity/Order'
import OrderFactory from './OrderFactory'

describe('Order factory unit tests', () => {
  test('should create an order', () => {
    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: 'Product 1',
          price: 10,
          productId: uuid(),
          quantity: 1
        }
      ]
    }

    const order = OrderFactory.create(orderProps)

    expect(order).toBeInstanceOf(Order)
    expect(order.id).toBe(orderProps.id)
    expect(order.customerId).toBe(orderProps.customerId)
    expect(order.items).toHaveLength(1)
    expect(order.items[0].id).toBe(orderProps.items[0].id)
    expect(order.items[0].name).toBe(orderProps.items[0].name)
    expect(order.items[0].price).toBe(orderProps.items[0].price)
    expect(order.items[0].productId).toBe(orderProps.items[0].productId)
    expect(order.items[0].quantity).toBe(orderProps.items[0].quantity)
    expect(order.total()).toBe(orderProps.items[0].price)
  })
})

import Order from './Order'
import OrderItem from './OrderItem'

describe('Order unit tests', () => {
  test('should throw an error when id is empty', () => {
    expect(() => new Order('', '1', [])).toThrowError('Order id is required')
  })

  test('should throw an error when customerId is empty', () => {
    expect(() => new Order('1', '', [])).toThrowError('Order customerId is required')
  })

  test('should throw an error when items is empty', () => {
    expect(() => new Order('1', '1', [])).toThrowError('Order items is required')
  })

  test('should calculate total', () => {
    const item1 = new OrderItem('1', 'Item 1', 100, '1', 2)
    const item2 = new OrderItem('1', 'Item 1', 320, '2', 2)
    const order = new Order('1', '1', [item1, item2])

    const total = order.total()

    expect(total).toBe(840)
  })

  test('should throw an error if items quantity is less or equal zero', () => {
    const item1 = new OrderItem('1', 'Item 1', 100, '1', 0)
    const item2 = new OrderItem('2', 'Item 2', 100, '1', -1)

    expect(() => new Order('1', '1', [item1])).toThrowError('Order items quantity must be greater than zero')
    expect(() => new Order('1', '1', [item2])).toThrowError('Order items quantity must be greater than zero')
  })

  test('should add new items', () => {
    const item1 = new OrderItem('1', 'Item 1', 100, '1', 2)
    const item2 = new OrderItem('1', 'Item 1', 320, '2', 2)
    const order = new Order('1', '1', [item1])

    order.addItems([item2])

    expect(order.items).toEqual([item1, item2])
  })

  test('should remove items', () => {
    const item1 = new OrderItem('1', 'Item 1', 100, '1', 2)
    const item2 = new OrderItem('2', 'Item 2', 320, '2', 2)
    const order = new Order('1', '1', [item1, item2])

    order.removeItems([item1])

    expect(order.items).toEqual([item2])

    order.removeItems([item2])

    expect(order.items).toEqual([])
  })
})

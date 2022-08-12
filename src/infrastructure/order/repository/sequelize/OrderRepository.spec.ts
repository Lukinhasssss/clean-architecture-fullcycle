import { Sequelize } from 'sequelize-typescript'
import Order from '../../../../domain/checkout/entity/Order'
import OrderItem from '../../../../domain/checkout/entity/OrderItem'
import Customer from '../../../../domain/customer/entity/Customer'
import Address from '../../../../domain/customer/value-object/Address'
import Product from '../../../../domain/product/entity/Product'
import CustomerModel from '../../../customer/repository/sequelize/CustomerModel'
import CustomerRepository from '../../../customer/repository/sequelize/CustomerRepository'
import ProductModel from '../../../product/repository/sequelize/ProductModel'
import ProductRepository from '../../../product/repository/sequelize/ProductRepository'
import OrderItemModel from './OrderItemModel'
import OrderModel from './OrderModel'
import OrderRepository from './OrderRepository'

describe('Order repository tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('should create an order', async () => {
    const customerRepository = new CustomerRepository()
    const productRepository = new ProductRepository()
    const orderRepository = new OrderRepository()

    const customer = new Customer('1', 'Monkey D. Luffy')
    const address = new Address('Rua das Flores', 7, 'Onigashima', '74110-000')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const product1 = new Product('1', 'Product 1', 100)
    const product2 = new Product('2', 'Product 2', 200)
    await productRepository.create(product1)
    await productRepository.create(product2)

    const orderItem1 = new OrderItem('1', product1.name, product1.price, product1.id, 2)
    const orderItem2 = new OrderItem('2', product2.name, product2.price, product2.id, 1)
    const order = new Order('1', customer.id, [orderItem1, orderItem2])

    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ['items'] })

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customerId: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem1.id,
          name: orderItem1.name,
          price: orderItem1.price,
          quantity: orderItem1.quantity,
          orderId: order.id,
          productId: orderItem1.productId
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          orderId: order.id,
          productId: orderItem2.productId
        }
      ]
    })
  })

  test('should update an order adding new items', async () => {
    const customerRepository = new CustomerRepository()
    const productRepository = new ProductRepository()
    const orderRepository = new OrderRepository()

    const customer = new Customer('1', 'Monkey D. Luffy')
    const address = new Address('Rua das Flores', 7, 'Onigashima', '74110-000')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const product1 = new Product('1', 'Product 1', 210)
    const product2 = new Product('2', 'Product 2', 120)
    await productRepository.create(product1)
    await productRepository.create(product2)

    const orderItem1 = new OrderItem('1', product1.name, product1.price, product1.id, 2)
    const order = new Order('1', customer.id, [orderItem1])
    await orderRepository.create(order)

    const orderItem2 = new OrderItem('2', product2.name, product2.price, product2.id, 1)
    order.addItems([orderItem2])
    await orderRepository.update(order)

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ['items'] })

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customerId: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem1.id,
          name: orderItem1.name,
          price: orderItem1.price,
          quantity: orderItem1.quantity,
          orderId: order.id,
          productId: orderItem1.productId
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          orderId: order.id,
          productId: orderItem2.productId
        }
      ]
    })
  })

  test('should update an order removing items', async () => {
    const customerRepository = new CustomerRepository()
    const productRepository = new ProductRepository()
    const orderRepository = new OrderRepository()

    const customer = new Customer('1', 'Monkey D. Luffy')
    const address = new Address('Rua das Flores', 7, 'Onigashima', '74110-000')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const product1 = new Product('1', 'Product 1', 210)
    const product2 = new Product('2', 'Product 2', 120)
    await productRepository.create(product1)
    await productRepository.create(product2)

    const orderItem1 = new OrderItem('1', product1.name, product1.price, product1.id, 2)
    const orderItem2 = new OrderItem('2', product2.name, product2.price, product2.id, 1)
    const order = new Order('1', customer.id, [orderItem1, orderItem2])
    await orderRepository.create(order)

    order.removeItems([orderItem1, orderItem2])
    await orderRepository.update(order)

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ['items'] })

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customerId: customer.id,
      total: order.total(),
      items: []
    })
  })

  test('should find an order by id', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('1', 'Monkey D. Luffy')
    const address = new Address('Rua das Flores', 7, 'Onigashima', '74110-000')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 100)
    await productRepository.create(product)

    const orderItem = new OrderItem('1', product.name, product.price, product.id, 2)
    const order = new Order('1', customer.id, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderFound = await orderRepository.findById(order.id)

    expect(orderFound).toStrictEqual(order)
  })

  test('should find all orders', async () => {
    const customerRepository = new CustomerRepository()
    const productRepository = new ProductRepository()
    const orderRepository = new OrderRepository()

    const customer = new Customer('1', 'Monkey D. Luffy')
    const address = new Address('Rua das Flores', 7, 'Onigashima', '74110-000')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const product1 = new Product('1', 'Product 1', 100)
    const product2 = new Product('2', 'Product 2', 320)
    const product3 = new Product('3', 'Product 3', 80)
    await productRepository.create(product1)
    await productRepository.create(product2)
    await productRepository.create(product3)

    const orderItem1 = new OrderItem('1', product1.name, product1.price, product1.id, 2)
    const orderItem2 = new OrderItem('2', product2.name, product2.price, product2.id, 1)
    const orderItem3 = new OrderItem('3', product3.name, product3.price, product3.id, 3)
    const order1 = new Order('1', customer.id, [orderItem1])
    const order2 = new Order('2', customer.id, [orderItem2])
    const order3 = new Order('3', customer.id, [orderItem3])
    await orderRepository.create(order1)
    await orderRepository.create(order2)
    await orderRepository.create(order3)

    const orders = await orderRepository.findAll()

    expect(orders).toHaveLength(3)
    expect(orders).toContainEqual(order1)
    expect(orders).toContainEqual(order2)
    expect(orders).toContainEqual(order3)
  })
})

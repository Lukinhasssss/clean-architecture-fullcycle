import Order from '../../../../domain/checkout/entity/Order'
import OrderItem from '../../../../domain/checkout/entity/OrderItem'
import IOrderRepository from '../../../../domain/checkout/repository/IOrderRepository'
import OrderItemModel from './OrderItemModel'
import OrderModel from './OrderModel'

export default class OrderRepository implements IOrderRepository {
  async create (entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity
        }))
      },
      {
        include: [{ model: OrderItemModel }]
      }
    )
  }

  async update (entity: Order): Promise<void> {
    const sequelize = OrderModel.sequelize

    await sequelize.transaction(async (t) => {
      await OrderItemModel.destroy({
        where: { orderId: entity.id },
        transaction: t
      })

      const items = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity,
        orderId: entity.id
      }))
      await OrderItemModel.bulkCreate(items, { transaction: t })
      await OrderModel.update(
        { total: entity.total() },
        { where: { id: entity.id }, transaction: t }
      )
    })
  }

  async findById (id: string): Promise<Order> {
    const order = await OrderModel.findOne({
      where: { id },
      include: [{ model: OrderItemModel }]
    })

    return new Order(
      order.id,
      order.customerId,
      order.items.map(item => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.productId,
        item.quantity
      ))
    )
  }

  async findAll (): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [{ model: OrderItemModel }]
    })

    return orders.map(order => new Order(
      order.id,
      order.customerId,
      order.items.map(item => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.productId,
        item.quantity
      ))
    ))
  }
}

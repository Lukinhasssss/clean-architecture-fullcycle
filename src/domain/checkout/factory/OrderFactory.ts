import Order from '../entity/Order'
import OrderItem from '../entity/OrderItem'

interface IOrderFactoryProps {
  id: string
  customerId: string
  items: Array<{
    id: string
    name: string
    price: number
    productId: string
    quantity: number
  }>
}

export default class OrderFactory {
  static create (props: IOrderFactoryProps): Order {
    const items = props.items.map(item => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity))
    return new Order(props.id, props.customerId, items)
  }
}

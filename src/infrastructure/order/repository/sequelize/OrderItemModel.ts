import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import OrderModel from './OrderModel'
import ProductModel from '../../../product/repository/sequelize/ProductModel'

@Table({ tableName: 'order_items', timestamps: false })
export default class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare productId: string

  @BelongsTo(() => ProductModel)
  declare product: ProductModel // Caso necessário recuperar o produto associado ao item do pedido

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare orderId: string

  @BelongsTo(() => OrderModel) // Indica que o item do pedido pertence a um pedido
  declare order: OrderModel // Caso necessário recuperar o pedido associado ao item do pedido

  @Column({ allowNull: false })
  declare quantity: number

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare price: number
}

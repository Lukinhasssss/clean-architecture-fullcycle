import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript'
import CustomerModel from '../../../customer/repository/sequelize/CustomerModel'
import OrderItemModel from './OrderItemModel'

@Table({ tableName: 'orders', timestamps: false })
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customerId: string

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel // Caso necessário recuperar o cliente associado ao pedido

  @HasMany(() => OrderItemModel) // Indica que o pedido possui vários itens
  declare items: OrderItemModel[]

  @Column({ allowNull: false })
  declare total: number
}

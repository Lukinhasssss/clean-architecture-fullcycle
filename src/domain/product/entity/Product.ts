import Entity from '../../@shared/entity/Entity.abstract'
import NotificationError from '../../@shared/notification/NotificationError'
import ProductValidatorFactory from '../factory/ProductValidatorFactory'
import IProduct from './IProduct'

export default class Product extends Entity implements IProduct {
  private _name: string
  private _price: number

  constructor (id: string, name: string, price: number) {
    super()
    this.id = id
    this._name = name
    this._price = price
    this.validate()

    if (this.notification.hasErrors())
      throw new NotificationError(this.notification.getErrors())
  }

  get name (): string {
    return this._name
  }

  get price (): number {
    return this._price
  }

  changeName (name: string): void {
    if (!name) {
      this.notification.addError({ message: 'Product name is required', context: 'product' })
      throw new NotificationError(this.notification.getErrors())
    }

    this._name = name
  }

  changePrice (price: number): void {
    if (price <= 0) {
      this.notification.addError({ message: 'Product price must be greater than zero', context: 'product' })
      throw new NotificationError(this.notification.getErrors())
    }

    this._price = price
  }

  validate (): boolean {
    ProductValidatorFactory.create().validate(this)
    return true
  }
}

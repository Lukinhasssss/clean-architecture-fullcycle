import Entity from '../../@shared/entity/Entity.abstract'
import NotificationError from '../../@shared/notification/NotificationError'
import CustomerValidatorFactory from '../factory/CustomerValidatorFactory'
import Address from '../value-object/Address'

export default class Customer extends Entity {
  private _name: string = ''
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor (id: string, name: string) {
    super()
    this.id = id
    this._name = name
    this.validate()

    if (this.notification.hasErrors())
      throw new NotificationError(this.notification.getErrors())
  }

  get name (): string {
    return this._name
  }

  get address (): Address {
    return this._address
  }

  get rewardPoints (): number {
    return this._rewardPoints
  }

  changeName (name: string): void {
    if (!name) {
      this.notification.addError({ message: 'Customer name is required', context: 'customer' })
      throw new NotificationError(this.notification.getErrors())
    }

    this._name = name
  }

  changeAddress (address: Address): void {
    this._address = address
  }

  activate (): void {
    if (!this._address) {
      this.notification.addError({ message: 'Address is mandatory to activate customer', context: 'customer' })
      throw new NotificationError(this.notification.getErrors())
    }

    this._active = true
  }

  deactivate (): void {
    this._active = false
  }

  isActive (): boolean {
    return this._active
  }

  addRewardPoints (points: number): void {
    this._rewardPoints += points
  }

  validate (): void {
    CustomerValidatorFactory.create().validate(this)
  }
}

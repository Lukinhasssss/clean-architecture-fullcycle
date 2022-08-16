import Entity from '../../@shared/entity/Entity.abstract'
import NotificationError from '../../@shared/notification/NotificationError'
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
    this._name = name
    this.validate()
  }

  changeAddress (address: Address): void {
    this._address = address
  }

  activate (): void {
    if (!this._address) throw new Error('Address is mandatory to activate customer')
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
    if (!this.id)
      this.notification.addError({ message: 'Customer id is required', context: 'customer' })
    if (!this._name)
      this.notification.addError({ message: 'Customer name is required', context: 'customer' })
    // if (!this._address)
    //   this.notification.addError({ message: 'Customer address is required', context: 'customer' })
  }
}

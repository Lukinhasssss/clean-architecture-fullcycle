import Address from '../value-object/Address'

export default class Customer {
  private readonly _id: string
  private _name: string = ''
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor (id: string, name: string) {
    this._id = id
    this._name = name
    this.validate()
  }

  get id (): string {
    return this._id
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
    if (!this._id) throw new Error('Customer id is required')
    if (!this._name) throw new Error('Customer name is required')
  }
}

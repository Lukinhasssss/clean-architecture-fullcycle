import OrderItem from './OrderItem'

export default class Order {
  private readonly _id: string
  private readonly _customerId: string
  private _items: OrderItem[]
  private _total: number

  constructor (id: string, customerId: string, items: OrderItem[]) {
    this._id = id
    this._customerId = customerId
    this._items = items
    this._total = this.total()
    this.validate()
  }

  get id (): string {
    return this._id
  }

  get customerId (): string {
    return this._customerId
  }

  get items (): OrderItem[] {
    return this._items
  }

  total (): number {
    return this._items.reduce((acc, item) => acc + item.totalPrice, 0)
  }

  validate (): boolean {
    if (!this._id) throw new Error('Order id is required')
    if (!this._customerId) throw new Error('Order customerId is required')
    if (!this._items.length) throw new Error('Order items is required')
    if (this._items.some(item => item.quantity <= 0)) throw new Error('Order items quantity must be greater than zero')

    return true
  }

  private addItem (item: OrderItem): void {
    this._items.push(item)
    this._total = this.total()
  }

  addItems (items: OrderItem[]): void {
    items.map(item => this.addItem(item))
  }

  private removeItem (item: OrderItem): void {
    this._items = this._items.filter(i => i.id !== item.id)
    this._total = this.total()
  }

  removeItems (items: OrderItem[]): void {
    items.map(item => this.removeItem(item))
  }
}

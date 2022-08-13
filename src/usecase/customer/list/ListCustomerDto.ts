// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputListCustomerDto {}

interface CustomerDto {
  id: string
  name: string
  address: {
    street: string
    number: number
    city: string
    zipCode: string
  }
}

export interface OutputListCustomerDto {
  customers: CustomerDto[]
}

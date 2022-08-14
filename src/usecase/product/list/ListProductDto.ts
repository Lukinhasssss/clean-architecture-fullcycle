// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputListProductDto {}

interface ProductDto {
  id: string
  name: string
  price: number
}

export interface OutputListProductDto {
  products: ProductDto[]
}

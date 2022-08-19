import { toXML } from 'jstoxml'
import { OutputListCustomerDto } from '../../../usecase/customer/list/ListCustomerDto'

export default class CustomerPresenter {
  static toXML (data: OutputListCustomerDto): string {
    const xmlOptions = {
      header: true,
      indent: '  ',
      newline: '\n',
      allowEmpty: true
    }

    return toXML({
      customers: data.customers.map(customer => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          city: customer.address.city,
          number: customer.address.number,
          zipCode: customer.address.zipCode
        }
      }))
    }, xmlOptions)
  }
}

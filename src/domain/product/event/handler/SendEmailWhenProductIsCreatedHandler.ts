import IEventHandler from '../../../@shared/event/IEventHandler'
import ProductCreatedEvent from '../ProductCreatedEvent'

export default class SendEmailWhenProductIsCreatedHandler implements IEventHandler<ProductCreatedEvent> {
  handle (event: ProductCreatedEvent): void {
    console.log('Sending email to ...')
  }
}

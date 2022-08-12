import IEvent from '../../@shared/event/IEvent'

export default class ProductCreatedEvent implements IEvent {
  eventData: any
  dataTimeOccurred: Date

  constructor (eventData: any) {
    this.eventData = eventData
    this.dataTimeOccurred = new Date()
  }
}

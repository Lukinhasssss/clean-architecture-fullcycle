import EventInterface from './IEvent'

export default interface IEventHandler<T extends EventInterface = EventInterface> {
  handle (event: T): void
}

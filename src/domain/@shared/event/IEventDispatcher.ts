import EventHandlerInterface from './IEventHandler'
import EventInterface from './IEvent'

export default interface IEventDispatcher {
  notify (event: EventInterface): void
  register (eventName: string, eventHandler: EventHandlerInterface): void
  unregister (eventName: string, eventHandler: EventHandlerInterface): void
  unregisterAll (): void
}

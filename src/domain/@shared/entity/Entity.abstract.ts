import Notification from '../notification/Notification'

export default abstract class Entity {
  id: string
  notification: Notification

  constructor () {
    this.notification = new Notification()
  }
}

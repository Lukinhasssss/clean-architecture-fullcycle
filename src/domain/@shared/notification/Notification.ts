export interface NotificationError {
  message: string
  context: string
}

export default class Notification {
  private readonly errors: NotificationError[] = []

  addError (error: NotificationError): void {
    this.errors.push(error)
  }

  hasErrors (): boolean {
    return this.errors.length > 0
  }

  messages (context?: string): string {
    let message = ''
    this.errors.forEach(error => {
      if (!context || error.context === context) { // if context is not defined or if context is equal to error context
        message += `${error.context}: ${error.message}, `
      }
    })

    message = message.slice(0, -2)
    return message
    // return this.errors
    //   .filter(error => error.context === context)
    //   .map(error => error.message)
    //   .join(', ')
  }
}

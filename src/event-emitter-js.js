export class EventEmitter {
  handlers = {}

  on(eventName, handler) {
    const eventHandlers = this.handlers[eventName]
    if (!eventHandlers) {
      this.handlers[eventName] = [handler]
      return
    }
    eventHandlers.push(handler)
  }

  emit(event, ...args) {
    const eventHandlers = this.handlers[event]
    eventHandlers?.forEach(handler => handler(...args))
  }
}

export class EventEmitter {
  handlers = {}

  on(event, listener) {
    const eventListeners = this.handlers[event]
    if (!eventListeners) {
      this.handlers[event] = [listener]
      return
    }
    eventListeners.push(listener)
  }

  emit(event, ...args) {
    const eventHandlers = this.handlers[event]
    eventHandlers?.forEach(handler => handler(...args))
  }
}

export const userEventEmitter = new EventsEmitter()

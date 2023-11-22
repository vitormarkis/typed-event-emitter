type ArgsTuple = any[]
type EventsTuple = Record<string, ArgsTuple>
type EventHandler<T extends ArgsTuple> = (...args: T) => void
type EventHandlers<T extends ArgsTuple> = EventHandler<T>[]
type HandlersMapping<Events extends EventsTuple> = {
  [K in keyof Events]: EventHandlers<Events[K]>
}

export class EventEmitter<EventArgs extends EventsTuple> {
  private handlers: Partial<HandlersMapping<EventArgs>> = {}

  on<TEventName extends keyof EventArgs>(event: TEventName, listener: EventHandler<EventArgs[TEventName]>) {
    const eventListeners = this.handlers[event] as EventHandlers<EventArgs[TEventName]>
    if (!eventListeners) {
      this.handlers[event] = [listener]
      return
    }
    eventListeners.push(listener)
  }

  emit<TEventName extends keyof EventArgs>(event: TEventName, ...args: EventArgs[TEventName]) {
    const eventHandlers = this.handlers[event]
    eventHandlers?.forEach(handler => handler(...args))
  }
}

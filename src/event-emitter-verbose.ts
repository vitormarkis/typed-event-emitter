export class EventEmitter<EventArgs extends Record<string, any[]>> {
  private handlers: Partial<{
    [K in keyof EventArgs]: ((...args: EventArgs[K]) => void)[]
  }> = {}

  on<TEventName extends keyof EventArgs>(
    eventName: TEventName,
    handler: (...args: EventArgs[TEventName]) => void
  ) {
    const eventHandlers = this.handlers[eventName] as ((...args: EventArgs[TEventName]) => void)[]
    if (!eventHandlers) {
      this.handlers[eventName] = [handler]
      return
    }
    eventHandlers.push(handler)
  }

  emit<TEventName extends keyof EventArgs>(event: TEventName, ...args: EventArgs[TEventName]) {
    const eventHandlers = this.handlers[event]
    eventHandlers?.forEach(handler => handler(...args))
  }
}

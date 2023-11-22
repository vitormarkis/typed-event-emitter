import { Session } from "./aux-types"
import { EventEmitter } from "./event-emitter"
import { getSession } from "./utils"

export type Events = {
  start: [startedAt: Date]
  error: [when: Date, cause?: string, details?: object]
  userLoggedIn: [err: Error | undefined, session: Session | undefined]
}

export const userEventEmitter = new EventEmitter<Events>()

/**
 *
 * Adicionando handlers
 */
userEventEmitter.on("start", startedAt => {
  console.log(`[${startedAt.toUTCString()}]: Server starting.`)
})

userEventEmitter.on("userLoggedIn", (err, session) => {
  // if (err) throw err
  if (err) return console.log(err)
  console.log(`New user ${session?.user.name} logged in, session: `, session)
})

userEventEmitter.on("error", (when, cause, details) => {
  console.log(`[${when.toUTCString()}]: Error occured, cause: ${cause}`)
})

/**
 *
 * Disparando eventos
 */
userEventEmitter.emit("start", new Date())

setTimeout(() => {
  let err
  const session = getSession()
  if (!session) {
    err = new Error("Session not found")
  }
  userEventEmitter.emit("userLoggedIn", err, session)
}, 1500)

setTimeout(() => {
  userEventEmitter.emit("error", new Date("2023-11-10T10:00:00Z"), "400 Intentional")
}, 4000)

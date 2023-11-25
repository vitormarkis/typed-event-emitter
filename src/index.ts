import { Session } from "./aux-types"
import { EventEmitter } from "./event-emitter"
import { getSession } from "./utils"

export type Events = {
  start: [startedAt: Date]
  error: [when: Date, cause?: string, details?: object]
  userLoggedIn: [err: Error | undefined, session: Session | undefined]
  hasSession: [props: SessionCreatedCommmand]
}

export type SessionCreatedCommmand = {
  when: Date
  id_user: string
  token?: string
}

export const eventEmitter = new EventEmitter<Events>()

/**
 *
 * Adicionando handlers
 */
eventEmitter.on("start", startedAt => {
  console.log(`[${startedAt.toUTCString()}]: Server starting.`)
})

eventEmitter.on("userLoggedIn", (err, session) => {
  // if (err) throw err
  if (err) return console.log(err)
  console.log(`New user ${session?.user.name} logged in, session: `, session)
})

eventEmitter.on("error", (when, cause, details) => {
  console.log(`[${when.toUTCString()}]: Error occured, cause: ${cause}`)
})

eventEmitter.on("hasSession", ({ id_user, when, token }) => {
  console.log(`[${when}]: Token generated! ${token}`)
})

/**
 *
 * Disparando eventos
 */
eventEmitter.emit("start", new Date())

setTimeout(() => {
  let err
  const session = getSession()
  if (!session) {
    err = new Error("Session not found")
  }
  eventEmitter.emit("userLoggedIn", err, session)
}, 1500)

setTimeout(() => {
  eventEmitter.emit("error", new Date("2023-11-10T10:00:00Z"), "400 Intentional")
}, 4000)

setTimeout(() => {
  eventEmitter.emit("hasSession", {
    id_user: "123",
    when: new Date(),
    token: "nsuhf2h838h2"
  })
}, 7000)

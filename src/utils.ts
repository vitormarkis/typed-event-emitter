const session = {
  user: {
    id: "123",
    name: "Vitor",
  },
  when: new Date(),
}

export function getSession() {
  const isEven = Math.random() > 0.5
  return isEven ? session : undefined
}

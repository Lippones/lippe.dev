import type { FastifyInstance } from 'fastify'

type Client = {
  id: string
  x: number
  y: number
  address: {
    city: string
    country: string
    region: string
    lat: number
    lng: number
  }
}

const connectedClients: Set<Client> = new Set()

function hasClientWithId(id: string) {
  for (const client of connectedClients) {
    if (client.id === id) {
      return client
    }
  }
  return null
}

export async function clientsRealTime(app: FastifyInstance) {
  app.after(async () => {
    app.io.sockets.sockets.forEach((socket) => {
      socket.disconnect(true)
    })
    app.io.on('connection', (socket) => {
      if (hasClientWithId(socket.id)) {
        console.log(`Client ${socket.id} is already in the room.`)
        return
      }

      console.info(`Client ${socket.id} joined the room.`)

      socket.on('cursor', (cursor: Client) => {
        if (hasClientWithId(cursor.id)) {
          console.log(`Client ${cursor.id} is already in the room.`)
          return
        }

        connectedClients.add(cursor)

        socket.emit('clients', Array.from(connectedClients))
      })

      socket.on('cursor-update', (cursor: Client) => {
        const client = hasClientWithId(cursor.id)

        if (!client) {
          return
        }

        client.x = cursor.x
        client.y = cursor.y

        connectedClients.delete(client)
        connectedClients.add(client)

        socket.emit('clients', Array.from(connectedClients))
      })

      socket.on('disconnect', () => {
        for (const client of connectedClients) {
          if (client.id === socket.id) {
            connectedClients.delete(client)
            break
          }
        }

        if (connectedClients.size === 0) {
          console.info('No clients connected. Stopping global timer.')
        }
      })
    })
  })
}

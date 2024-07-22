import { create } from 'zustand'

import { Client } from '@/@types/client'
import { socket } from '@/services/socket'

interface ConnectedClientsStore {
  clientIp: string | null
  clients: Client[]
  addClient: (client: Client) => void
  removeClient: (client: Client) => void
  updateClient: (client: Partial<Client>) => void
  connected: boolean
  startConnection: () => void
}

export const connectedClientsStore = create<ConnectedClientsStore>(
  (set, get) => ({
    clients: [],
    clientIp: null,
    connected: false,
    startConnection: () => {
      socket.on('connect', () => {
        if (get().connected || socket.connected) return
        console.log('Connected to the server')
        set({ connected: true })
      })

      socket.on('clients', (clients: Client[]) => {
        set({ clients })
      })
    },
    addClient: (client) => {
      const clientExists = get().clients.find((c) => c.id === client.id)

      if (clientExists) {
        return
      }

      set({
        clients: [...get().clients, client],
        clientIp: client.address.ip,
      })

      socket.emit('cursor', client)
    },
    removeClient: (client) => {
      set({
        clients: get().clients.filter((c) => c.id !== client.id),
      })
    },
    updateClient(client) {
      const index = get().clients.findIndex((c) => c.id === client.id)
      if (index === -1) {
        return
      }

      const newClients = [...get().clients]
      newClients[index] = {
        ...newClients[index],
        ...client,
      }

      set({
        clients: newClients,
      })

      console.log('updating client', newClients[index])

      socket.emit('cursor', newClients[index])
    },
  }),
)

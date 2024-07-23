import { create } from 'zustand'

import { Client } from '@/@types/client'
import { socket } from '@/services/socket'

interface ConnectedClientsStore {
  clientIp: string | null
  clients: Client[]
  addClient: (client: Client) => void
  removeClient: (clientId: string) => void
  connected: boolean
  startConnection: () => void
}

export const connectedClientsStore = create<ConnectedClientsStore>(
  (set, get) => ({
    clientIp: null,
    clients: [],
    connected: false,
    startConnection: () => {
      if (get().connected || socket.connected) return

      socket.on('connect', () => {
        console.log('Connected to the server')
        set({ connected: true })

        socket.emit('request-clients')
      })

      socket.on('clients', (clients: Client[]) => {
        console.log('Received clients:', clients)
        set({ clients })
      })

      socket.on('client-remove', (id: string) => {
        console.log('Client removed:', id)
        set((state) => ({
          clients: state.clients.filter((c) => c.id !== id),
        }))
      })

      socket.on('client-update', (updatedClient: Client) => {
        console.log('Client updated:', updatedClient)
        set((state) => ({
          clients: state.clients.map((c) =>
            c.id === updatedClient.id ? { ...c, ...updatedClient } : c,
          ),
        }))
      })
    },
    addClient: (client) => {
      const clientExists = get().clients.find((c) => c.id === client.id)

      if (clientExists) {
        return
      }

      set({
        clients: [...get().clients, client],
      })
    },
    removeClient: (clientId) => {
      set((state) => ({
        clients: state.clients.filter((c) => c.id !== clientId),
      }))
    },
  }),
)

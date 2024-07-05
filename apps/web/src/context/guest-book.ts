import { create } from 'zustand'

import { Message } from '@/services/guestbook/types'
import { socket } from '@/services/socket'

interface GuestbookStore {
  messages: Message[]
  setMessages: (messages: Message[]) => void
  connected: boolean
  startConnection: () => void
}

export const guestbookStore = create<GuestbookStore>((set, get) => ({
  messages: [],
  connected: false,
  setMessages: (messages) => set({ messages }),
  startConnection: () => {
    socket.on('connect', () => {
      if (get().connected || socket.connected) return
      console.log('Connected to the server')
      socket.emit('join')
      set({ connected: true })
    })

    socket.on('new-message', ({ message }: { message: Message }) => {
      const haveMessage = get().messages.find(
        (value) => value.guestbook.id === message.guestbook.id,
      )
      if (!haveMessage) set({ messages: [message, ...get().messages] })
    })

    socket.on('delete-message', ({ messageId }: { messageId: string }) => {
      const haveMessage = get().messages.find(
        (value) => value.guestbook.id === messageId,
      )
      if (!haveMessage) return // Avoid unnecessary rendering
      set({
        messages: get().messages.filter(
          (message) => message.guestbook.id !== messageId,
        ),
      })
    })
  },
}))

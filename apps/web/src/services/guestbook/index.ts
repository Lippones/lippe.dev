import { api } from '../api'
import { Message } from './types'

interface GetMessagesProps {
  page?: number
  perPage?: number
}

export async function getMessages({ page, perPage }: GetMessagesProps) {
  const { data } = await api.get<{
    messages: Message[]
    page: number
    totalPages: number
  }>('/guestbook', {
    params: {
      page,
      perPage,
    },
  })

  return data
}

interface SendMessageProps {
  message: string
}

export async function sendMessage({ message }: SendMessageProps) {
  await api.post('/guestbook', {
    message,
  })
}

interface DeleteMessageProps {
  id: string
}

export async function deleteMessage({ id }: DeleteMessageProps) {
  await api.delete(`/guestbook/${id}`)
}

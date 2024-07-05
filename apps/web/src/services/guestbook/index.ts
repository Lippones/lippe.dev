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

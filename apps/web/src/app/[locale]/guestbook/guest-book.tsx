import { auth } from '@lippe/auth'

import { Separator } from '@/components/ui/separator'
import { getMessages } from '@/services/guestbook'

import { MessageForm } from './message-form'
import { MessageList } from './message-list'

export async function GuestBook() {
  const [session, { messages }] = await Promise.all([
    auth(),
    getMessages({ page: 1, perPage: 10 }),
  ])

  return (
    <>
      <MessageForm isAuthenticated={!!session} />
      <Separator className="my-10" />
      <div>
        <MessageList messages={messages} />
      </div>
    </>
  )
}

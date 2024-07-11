import { auth } from '@lippe/auth'
import { Suspense } from 'react'

import { Separator } from '@/components/ui/separator'
import { getMessages } from '@/services/guestbook'

import { MessageForm } from './message-form'
import { MessageList } from './message-list'

export async function GuestBook() {
  const [session, { messages }] = await Promise.all([auth(), getMessages({})])

  return (
    <>
      <Suspense>
        <MessageForm isAuthenticated={!!session} />
      </Suspense>
      <Separator className="my-10" />
      <div>
        <MessageList messages={messages} session={session} />
      </div>
    </>
  )
}

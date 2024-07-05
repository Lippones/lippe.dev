'use client'
import type { Session } from '@lippe/auth'
import { useMutation } from '@tanstack/react-query'
import { formatDistance } from 'date-fns'
import { Loader2, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { guestbookStore } from '@/context/guest-book'
import { deleteMessage } from '@/services/guestbook'
import { Message } from '@/services/guestbook/types'

interface MessageListProps {
  messages: Message[]
  session: Session | null
}

export function MessageList({ messages, session }: MessageListProps) {
  const {
    messages: filteredMessages,
    setMessages,
    startConnection,
  } = guestbookStore((state) => ({
    messages: state.messages,
    startConnection: state.startConnection,
    setMessages: state.setMessages,
  }))

  useEffect(() => {
    startConnection()
  }, [])

  useEffect(() => {
    console.log('messages', messages)
    setMessages(messages)
  }, [messages, setMessages])

  const { mutate: handleDeleteMessage, isPending: isDeletingMessage } =
    useMutation({
      mutationKey: ['deleteMessage'],
      mutationFn: deleteMessage,
    })
  const amountOfWords = 124

  const [isExpanded, setIsExpanded] = useState<boolean[]>([])

  const handleExpand = (index: number) => {
    setIsExpanded((prev) => {
      const newExpanded = [...prev]
      newExpanded[index] = !newExpanded[index]
      return newExpanded
    })
  }

  return (
    <ul className="flex flex-col divide-y overflow-hidden rounded-md border-y">
      {filteredMessages.map(
        ({ user, guestbook: { id, message, authorId, createdAt } }, index) => {
          const splittedText = message.split(' ')
          const itCanOverflow = splittedText.length > amountOfWords
          const beginText = itCanOverflow
            ? splittedText.slice(0, amountOfWords - 1).join(' ')
            : message
          const endText = splittedText.slice(amountOfWords - 1).join(' ')

          const isOwnerOrAdmin =
            session?.user.email === 'filipe68ft@hotmail.com' ||
            session?.user.id === authorId

          return (
            <li key={id}>
              <Card className="rounded-none border-y-0">
                <CardHeader>
                  <CardTitle>
                    <div className="flex items-center">
                      <Avatar>
                        <AvatarImage src={user.image || ''} />
                        <AvatarFallback>
                          {user.name
                            .split(' ')
                            .map((name) => name[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="inline-flex items-center gap-2">
                        <span className="ml-2 text-base font-semibold">
                          {user.name}
                        </span>
                        <span className="text-sm font-light text-muted-foreground">
                          ·
                        </span>
                        <span className="text-sm font-light text-muted-foreground">
                          {formatDistance(createdAt, new Date())}
                        </span>
                      </div>
                      {isOwnerOrAdmin && (
                        <Button
                          variant={'ghost'}
                          size={'icon'}
                          className="ml-auto"
                          disabled={isDeletingMessage}
                          onClick={() => {
                            handleDeleteMessage({ id })
                          }}
                        >
                          {isDeletingMessage ? (
                            <Loader2 className="mr-2 size-4 animate-spin text-destructive" />
                          ) : (
                            <Trash2 className="size-4 text-destructive" />
                          )}
                        </Button>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="flex flex-col text-pretty text-sm">
                    {`${beginText} ${isExpanded[index] === false ? '...' : ''}`}
                    {itCanOverflow && (
                      <>
                        <span className={`${!isExpanded[index] && 'hidden'}`}>
                          {endText}
                        </span>
                        <span
                          className="mt-2 cursor-pointer text-sm font-medium text-muted-foreground"
                          onClick={() => handleExpand(index)}
                        >
                          {isExpanded[index] ? 'show less' : 'show more'}
                        </span>
                      </>
                    )}
                  </p>
                </CardContent>
              </Card>
            </li>
          )
        },
      )}
    </ul>
  )
}

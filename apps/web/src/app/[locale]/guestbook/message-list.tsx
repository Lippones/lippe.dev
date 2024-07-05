'use client'
import { formatDistance } from 'date-fns'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Message } from '@/services/guestbook/types'

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const amountOfWords = 36

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
      {messages.map(
        ({ user, guestbook: { id, message, createdAt } }, index) => {
          const splittedText = message.split(' ')
          const itCanOverflow = splittedText.length > amountOfWords
          const beginText = itCanOverflow
            ? splittedText.slice(0, amountOfWords - 1).join(' ')
            : message
          const endText = splittedText.slice(amountOfWords - 1).join(' ')

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

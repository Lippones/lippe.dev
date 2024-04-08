'use client'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Moon } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'

export function Profile() {
  return (
    <div className="absolute left-0 bottom-12">
      <HoverCard openDelay={200} closeDelay={200}>
        <HoverCardTrigger asChild>
          <AvatarProfile avatarUrl="/profile.png" status="away" />
        </HoverCardTrigger>
        <HoverCardContent>
          The React Framework – created and maintained by @vercel.
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

interface AvatarProfileProps {
  avatarUrl: string
  status: 'online' | 'offline' | 'away'
}

export function AvatarProfile({ avatarUrl, status }: AvatarProfileProps) {
  return (
    <div className="relative max-w-fit">
      <Avatar className="w-20 h-20">
        <AvatarImage src={avatarUrl} width={40} height={40} alt="Filipe" />
        <AvatarFallback>FV</AvatarFallback>
      </Avatar>
      <ProfileStatus status={status} />
    </div>
  )
}

interface ProfileStatusProps {
  status: 'online' | 'offline' | 'away'
}

export function ProfileStatus({ status }: ProfileStatusProps) {
  return (
    <div aria-label="status">
      <span className="absolute -bottom-1 -right-1 p-1.5 rounded-full flex justify-center items-center bg-secondary">
        {status === 'online' && (
          <span className="bg-green-500 block w-4 h-4 rounded-full" />
        )}
        {status === 'offline' && (
          <span className="bg-gray-500 block w-4 h-4 rounded-full" />
        )}
        {status === 'away' && (
          <Moon className="w-4 h-4 fill-yellow-500 text-yellow-500" />
        )}
        <span className="sr-only">{status}</span>
      </span>
    </div>
  )
}

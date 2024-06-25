import { ComponentProps } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ProfileStatus } from './profile-status'

interface AvatarProfileProps extends ComponentProps<'div'> {
  avatarUrl: string
  status: 'online' | 'offline' | 'away'
}

export function AvatarProfile({ avatarUrl, status }: AvatarProfileProps) {
  return (
    <div className="relative max-w-fit">
      <Avatar className="h-20 w-20">
        <AvatarImage src={avatarUrl} width={40} height={40} alt="Filipe" />
        <AvatarFallback>FV</AvatarFallback>
      </Avatar>
      <ProfileStatus status={status} />
    </div>
  )
}

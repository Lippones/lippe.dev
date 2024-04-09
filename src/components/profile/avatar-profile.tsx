import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ProfileStatus } from './profile-status'

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

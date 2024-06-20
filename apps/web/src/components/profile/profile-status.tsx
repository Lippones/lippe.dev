import { Moon } from 'lucide-react'

interface ProfileStatusProps {
  status: 'online' | 'offline' | 'away'
}

export function ProfileStatus({ status }: ProfileStatusProps) {
  return (
    <div aria-label="status">
      <span className="absolute -bottom-1 -right-1 flex items-center justify-center rounded-full bg-secondary p-1.5">
        {status === 'online' && (
          <span className="block h-4 w-4 rounded-full bg-green-500" />
        )}
        {status === 'offline' && (
          <span className="block h-4 w-4 rounded-full bg-gray-500" />
        )}
        {status === 'away' && (
          <Moon className="h-4 w-4 fill-yellow-500 text-yellow-500" />
        )}
        <span className="sr-only">{status}</span>
      </span>
    </div>
  )
}

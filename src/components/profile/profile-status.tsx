import { Moon } from 'lucide-react'

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

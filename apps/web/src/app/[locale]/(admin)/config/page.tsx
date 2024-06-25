'use client'
import { FaSpotify } from 'react-icons/fa'

import { signInProvider } from '@/actions/auth'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <div className="container">
      <h1>Config</h1>
      <div>
        <Button onClick={async () => await signInProvider('spotify')}>
          <FaSpotify className="mr-2" /> Spotify
        </Button>
      </div>
    </div>
  )
}

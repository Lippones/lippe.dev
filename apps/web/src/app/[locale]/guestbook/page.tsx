import { auth, signIn } from '@lippe/auth'
import { Github } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default async function GuestBook() {
  const session = await auth()
  console.log(session)

  return (
    <div className="mx-auto min-h-screen w-full max-w-screen-2xl px-4 py-10 md:px-8">
      <h1 className="text-4xl font-bold">Guestbook</h1>
      <p>Sign the guestbook to let me know you were here.</p>
      <form
        action={async () => {
          'use server'
          await signIn('github')
        }}
      >
        <Button>
          <Github /> Sign the Guestbook
        </Button>
      </form>
    </div>
  )
}

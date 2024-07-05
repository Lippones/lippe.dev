'use client'
import { useTranslations } from 'next-intl'
import { FaDiscord, FaGithub, FaSpotify } from 'react-icons/fa'

import { signInProvider } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface LoginOptionsProps {
  children: React.ReactNode
  redirect?: string
}

export function LoginOptions({ children, redirect }: LoginOptionsProps) {
  const t = useTranslations('pages.guestbook')
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('loginOptions.title')}</DialogTitle>
          <DialogDescription>{t('loginOptions.description')}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Button
            onClick={() => {
              signInProvider('github', redirect)
            }}
            variant={'secondary'}
          >
            <FaGithub className="mr-2" /> Github
          </Button>
          <Button
            onClick={() => {
              signInProvider('discord', redirect)
            }}
            variant={'secondary'}
          >
            <FaDiscord className="mr-2" /> Discord
          </Button>
          <Button
            onClick={() => {
              signInProvider('spotify', redirect)
            }}
            variant={'secondary'}
          >
            <FaSpotify className="mr-2" /> Spotify
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

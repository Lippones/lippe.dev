/* eslint-disable react/no-unescaped-entities */
'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useSearchParams } from 'next/navigation'
import { Button } from './ui/button'
import { Suspense } from 'react'

export function ThanksInviteDialog() {
  return (
    <Suspense fallback={null}>
      <InviteDialog />
    </Suspense>
  )
}

export function InviteDialog() {
  const query = useSearchParams()
  const invite = query.get('invite')

  if (!invite) {
    return null
  }

  return (
    <Dialog defaultOpen={!!invite}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thank you for your interest!</DialogTitle>
          <DialogDescription>
            We'll send you an invite as soon as possible.
          </DialogDescription>
        </DialogHeader>
        <div>
          <p>
            Fico feliz que aceitou o convite! espero que goste do meu portfólio.
            Aqui você pode ver alguns dos meus projetos e saber um pouco mais
            sobre mim.
          </p>
        </div>
        <DialogFooter>
          <Button>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

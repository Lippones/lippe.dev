/* eslint-disable react/no-unescaped-entities */
'use client'
// import { setCookie } from '@/actions'
import { Button } from './ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface DevelopmentAlertProps {
  isAlertConfirmed: boolean
  title: string
  description: string
  button: string
}

export function DevelopmentAlert({
  isAlertConfirmed,
  description,
  title,
  button,
}: DevelopmentAlertProps) {
  return (
    <AlertDialog
      onOpenChange={() => {
        // setCookie('isAlertConfirmed', 'true')
      }}
      defaultOpen={!isAlertConfirmed}
    >
      <AlertDialogTrigger asChild>
        <Button
          className="rounded-full bottom-0 ml-auto sticky"
          size={'icon'}
          variant="outline"
        >
          🚧
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>{button}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

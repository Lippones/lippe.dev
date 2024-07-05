'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { sendMessage } from '@/services/guestbook'

import { LoginOptions } from './login-options'

const MAX_MESSAGE_LENGTH = 1000

const formSchema = z.object({
  message: z.string().min(10).max(MAX_MESSAGE_LENGTH),
})

type formData = z.infer<typeof formSchema>

interface MessageFormProps {
  isAuthenticated: boolean
}

export function MessageForm({ isAuthenticated }: MessageFormProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const defaultMessage = searchParams.get('message')

  const t = useTranslations('pages.guestbook')
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: defaultMessage || '',
    },
  })

  const { mutateAsync: handleSendMessage } = useMutation({
    mutationKey: ['createMessage'],
    mutationFn: sendMessage,
    onSuccess() {
      router.refresh()
      reset()
    },
  })

  const message = watch('message')

  async function onSubmit({ message }: formData) {
    await handleSendMessage({ message })
  }

  const redirect = `/guestbook?message=${encodeURIComponent(message)}`

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <Textarea
          {...register('message')}
          placeholder="Escreva sua mensagem..."
        />
        <div className="flex">
          {errors.message && (
            <span className="mt-2 text-sm text-red-500">{t('form.error')}</span>
          )}
          <span className="ml-auto mt-2 text-xs text-muted-foreground">
            {message?.length || 0}/{MAX_MESSAGE_LENGTH}
          </span>
        </div>
      </div>
      {isAuthenticated ? (
        <Button
          className="ml-auto mt-2"
          disabled={isSubmitting}
          type={'submit'}
        >
          {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}{' '}
          {t('form.logged')}
        </Button>
      ) : (
        <LoginOptions redirect={redirect}>
          <Button
            className="ml-auto mt-2"
            type={message?.length >= 10 ? 'submit' : 'button'}
          >
            {t('form.button')}
          </Button>
        </LoginOptions>
      )}
    </form>
  )
}

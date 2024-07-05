'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  message: z.string().nonempty('Por favor, insira uma mensagem'),
})

type formData = z.infer<typeof formSchema>

interface MessageFormProps {
  isAuthenticated: boolean
}

export function MessageForm({ isAuthenticated }: MessageFormProps) {
  const { register, handleSubmit } = useForm<formData>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit({ message }: formData) {
    console.log(message)
  }

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        {...register('message')}
        placeholder="Escreva sua mensagem..."
      />
      <Button disabled={!isAuthenticated} className="ml-auto mt-2">
        Faça login para deixar uma mensagem
      </Button>
    </form>
  )
}

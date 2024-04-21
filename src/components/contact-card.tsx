'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { track } from '@vercel/analytics/react'
import { useState, FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import ContactEmail from '../../emails/contact'
import { toast } from 'sonner'
import { sendEmail } from '@/services/email'
import { render } from '@react-email/render'

const formSchema = z.object({
  email: z.string().email("It's not a valid email"),
  message: z
    .string({
      required_error: 'Message must have at least 5 characters',
    })
    .min(5, 'Message must have at least 5 characters'),
})

type formSchemaData = z.infer<typeof formSchema>

interface ContactCardProps {
  title: string
  description: string
  textArea: string
  button: string[]
}

export function ContactCard({ button, description, textArea, title }: ContactCardProps) {
  const [step, setStep] = useState(1)

  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { isSubmitting, errors },
  } = useForm<formSchemaData>({
    resolver: zodResolver(formSchema),
  })

  async function handleSendEmail({ email, message }: formSchemaData) {
    track('contact-email', {
      email,
      message,
    })

    try {
      await sendEmail({
        html: render(
          ContactEmail({
            email,
            message,
          }),
        ),
        subject: 'New contact from your website',
        to: 'filipe68ft@hotmail.com',
      })

      toast.success('Email sent successfully.')
    } catch (e) {
      toast.error('An error occurred, please try again later.')
    }
  }

  function nextStep(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!getFieldState('email').isTouched) {
      return handleSubmit(handleSendEmail)(e)
    }

    if (step === 2) return handleSubmit(handleSendEmail)(e)

    setStep((step) => step + 1)
  }

  return (
    <Card className="w-full bg-background/60 backdrop-blur-md md:w-[500px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <form onSubmit={nextStep} className="flex flex-col">
          {step === 1 ? (
            <Input placeholder="jonhdoe@example.com" {...register('email')} />
          ) : (
            <Textarea
              disabled={isSubmitting}
              placeholder={textArea}
              {...register('message')}
            />
          )}
          {errors.email && (
            <span className="text-red-400 text-xs mt-2">
              {errors.email.message}
            </span>
          )}
          {errors.message && step === 2 && (
            <span className="text-red-400 text-xs mt-2">
              {errors.message.message}
            </span>
          )}
          <CardFooter className="px-0 mt-8">
            <Button disabled={isSubmitting} type="submit" className="w-full">
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-6 animate-spin" />
              )}{' '}
              {step === 1 ? button[0] : [button[1]]}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}

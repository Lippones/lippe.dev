'use server'
import { env } from '@lippe/env'
import { Resend } from 'resend'

const resend = new Resend(env.RESEND_API_KEY)

interface VerificationEmailProps {
  subject: string
  to: string
  react?: React.ReactElement
  html?: string
  text?: string
}

export async function sendEmail({
  react,
  subject,
  to,
  html,
}: VerificationEmailProps) {
  // if (!html && !react) throw new Error('You must provide either html or react')

  return await resend.emails.send({
    from: env.CONTACT_EMAIL,
    to,
    subject,
    react,
    text: 'Hello',
    html,
  })
}

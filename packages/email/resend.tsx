import { env } from '@lippe/env'
import { Resend } from 'resend'

const resend = new Resend(env.RESEND_API_KEY)

interface VerificationEmailProps {
  subject: string
  to: string,
  from: string,
  react: React.ReactElement
}

export async function sendEmail({
  react,
  subject,
  to,
  from = 'hi@lippe.dev'
}: VerificationEmailProps) {
  return await resend.emails.send({
    from,
    to,
    subject,
    react,
  })
}

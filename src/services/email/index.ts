import { api } from '../api'

interface sendEmailProps {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ subject, html, to }: sendEmailProps) {
  return await api.post('/api/send', {
    subject,
    html,
    to,
  })
}

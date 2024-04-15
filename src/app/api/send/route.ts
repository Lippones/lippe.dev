// import { env } from '@/env'
import { env } from '@/env'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(env.RESEND_API_KEY)

const BodyDataSchema = z.object({
  to: z.string().email(),
  html: z.string().min(1),
  subject: z.string().min(5),
})

export async function POST(request: Request) {
  const data = await request.json()

  const { html, to, subject } = BodyDataSchema.parse(data)

  try {
    const { data, error } = await resend.emails.send({
      from: env.CONTACT_EMAIL,
      to,
      subject,
      html,
    })

    if (error) {
      return Response.json({ error })
    }

    return Response.json({ data })
  } catch (error) {
    return Response.json({ error })
  }
}

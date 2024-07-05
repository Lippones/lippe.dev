import { env } from '@lippe/env'
import Discord from 'next-auth/providers/discord'

export const DiscordProvider = Discord({
  clientId: env.DISCORD_CLIENT_ID,
  clientSecret: env.DISCORD_CLIENT_SECRET,
  allowDangerousEmailAccountLinking: true,
})

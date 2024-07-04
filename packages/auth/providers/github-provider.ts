import { env } from '@lippe/env'
import Github from 'next-auth/providers/github'

export const GithubProvider = Github({
  clientId: env.GITHUB_CLIENT_ID,
  clientSecret: env.GITHUB_CLIENT_SECRET,
})

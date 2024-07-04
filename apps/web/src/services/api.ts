import { env } from '@lippe/env'
import axios from 'axios'

import { generateJWTSession } from '@/actions/auth'

const apiUrl = new URL('/api', env.NEXT_PUBLIC_URL).href

export const api = axios.create({
  baseURL: apiUrl,
})

api.interceptors.request.use(
  async (config) => {
    const token = await generateJWTSession()

    console.log(token)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

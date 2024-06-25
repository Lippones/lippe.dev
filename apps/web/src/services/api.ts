import { env } from '@lippe/env'
import axios from 'axios'

const apiUrl = new URL('/api', env.NEXT_PUBLIC_URL).href

export const api = axios.create({
  baseURL: apiUrl,
})

import { env } from '@lippe/env'
import { io } from 'socket.io-client'

export const socket = io(env.NEXT_PUBLIC_API_URL)

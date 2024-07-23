'use client'

import usePartySocket from 'partysocket/react'
import { ReactNode, useEffect, useState } from 'react'

import { Position, useCursorStore } from '@/context/cursor-store'

import OtherCursor from './outher-cursor'
import SelfCursor from './self-cursor'

interface CursorsProviderProps {
  host: string
  room: string
  children: ReactNode
}

export function CursorProvider({ children, host, room }: CursorsProviderProps) {
  const { self, setSelf, others, setOthers, updateOther, removeOther } =
    useCursorStore((state) => ({
      self: state.self,
      setSelf: state.setSelf,
      others: state.others,
      setOthers: state.setOthers,
      updateOther: state.updateOther,
      removeOther: state.removeOther,
    }))

  const [dimensions, setDimensions] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })

  const socket = usePartySocket({
    host,
    room,
  })

  useEffect(() => {
    if (socket) {
      const onMessage = (evt: WebSocketEventMap['message']) => {
        const msg = JSON.parse(evt.data as string)
        switch (msg.type) {
          case 'sync':
            setOthers(msg.cursors)
            break
          case 'update':
            updateOther(msg.id, {
              x: msg.x,
              y: msg.y,
              country: msg.country,
              lastUpdate: msg.lastUpdate,
              pointer: msg.pointer,
            })
            break
          case 'remove':
            removeOther(msg.id)
            break
        }
      }
      socket.addEventListener('message', onMessage)

      return () => {
        socket.removeEventListener('message', onMessage)
      }
    }
  }, [socket, setOthers, updateOther, removeOther])

  useEffect(() => {
    const onResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', onResize)
    onResize()
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!socket) return
      if (!dimensions.width || !dimensions.height) return
      const position: Position = {
        x: e.clientX / dimensions.width,
        y: e.clientY / dimensions.height,
        pointer: 'mouse',
      }
      socket.send(JSON.stringify(position))
      setSelf(position)
    }
    window.addEventListener('mousemove', onMouseMove)

    const onTouchMove = (e: TouchEvent) => {
      if (!socket) return
      if (!dimensions.width || !dimensions.height) return
      e.preventDefault()
      const position: Position = {
        x: e.touches[0].clientX / dimensions.width,
        y: e.touches[0].clientY / dimensions.height,
        pointer: 'touch',
      }
      socket.send(JSON.stringify(position))
      setSelf(position)
    }
    window.addEventListener('touchmove', onTouchMove)

    const onTouchEnd = () => {
      if (!socket) return
      socket.send(JSON.stringify({}))
      setSelf(null)
    }
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [socket, dimensions, setSelf])

  return (
    <>
      {Object.keys(others).map((id) => (
        <div key={id}>
          <OtherCursor id={id} windowDimensions={dimensions} fill="#06f" />
        </div>
      ))}
      {self?.pointer === 'touch' && (
        <SelfCursor windowDimensions={dimensions} />
      )}
      {children}
    </>
  )
}

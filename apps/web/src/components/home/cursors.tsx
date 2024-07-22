'use client'

import { useEffect } from 'react'

import { connectedClientsStore } from '@/context/connected-clients'
import { useMousePosition } from '@/hooks/use-mouse-position'

export function Cursors() {
  const { x, y } = useMousePosition()

  const { clients, clientIp, updateClient } = connectedClientsStore(
    (state) => ({
      clients: state.clients,
      clientIp: state.clientIp,
      updateClient: state.updateClient,
    }),
  )

  useEffect(() => {
    if (!clientIp) return
    updateClient({
      x,
      id: clientIp,
      y,
    })
  }, [clientIp, x, y])

  useEffect(() => {
    console.log(clients)
  }, [clients])

  return (
    <>
      {clients.map((client) => (
        <div
          key={client.id}
          className="absolute z-[1000]"
          style={{
            left: client.x,
            top: client.y,
          }}
        >
          <span
            className={`${
              client.address.ip === clientIp ? 'bg-red-500' : 'bg-green-500'
            } block rounded-full px-8 py-2`}
          >
            {client.address.city}
          </span>
        </div>
      ))}
    </>
  )
}

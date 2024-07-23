'use client'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import { globeConfig } from '@/config/globe-config'
import { connectedClientsStore } from '@/context/connected-clients'

const World = dynamic(() => import('../ui/globe').then((m) => m.World), {
  ssr: false,
})

type Address = {
  ip: string
  city: string
  region: string
  country: string
  lat: number
  lng: number
}

interface HeroWorldProps {
  address: Address
}

export function HeroWorld({ address }: HeroWorldProps) {
  const colors = ['#9333ea', '#9333ea', '#9333ea']

  const { clients, addClient } = connectedClientsStore((state) => ({
    clients: state.clients,
    addClient: state.addClient,
  }))

  useEffect(() => {
    addClient({
      id: address.ip,
      address,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  const arcs = clients.map((client) => {
    return {
      order: 1,
      startLat: client.address.lat,
      startLng: client.address.lng,
      endLat: -18.850651,
      endLng: -41.948792,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    }
  })

  const initialPosition = { lat: address.lat, lng: address.lng }

  const config = {
    ...globeConfig,
    initialPosition,
  }

  return <World globeConfig={config} data={arcs} />
}

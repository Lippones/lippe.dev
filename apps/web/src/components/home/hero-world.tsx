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

  // const sampleArcs = [
  //   {
  //     order: 1,
  //     startLat: -19.885592,
  //     startLng: -43.951191,
  //     endLat: -22.9068,
  //     endLng: -43.1729,
  //     arcAlt: 0.1,
  //     color: colors[Math.floor(Math.random() * (colors.length - 1))],
  //   },
  //   {
  //     order: 1,
  //     startLat: 28.6139,
  //     startLng: 77.209,
  //     endLat: 3.139,
  //     endLng: 101.6869,
  //     arcAlt: 0.2,
  //     color: colors[Math.floor(Math.random() * (colors.length - 1))],
  //   },
  //   {

  return <World globeConfig={globeConfig} data={arcs} />
}

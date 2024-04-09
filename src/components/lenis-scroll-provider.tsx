'use client'
import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'

export function LenisScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const lenis = new Lenis()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lenis.on('scroll', (e: any) => {
      console.log(e)
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])
  return <>{children}</>
}

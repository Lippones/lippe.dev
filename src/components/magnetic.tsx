'use client'
import { ReactElement, cloneElement, useEffect, useRef } from 'react'
import gsap from 'gsap'

interface MagneticProps {
  children: ReactElement
  magneticPower?: number
}

export function Magnetic({ children, magneticPower = 0.5 }: MagneticProps) {
  const magnetic = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const xTo = gsap.quickTo(magnetic.current, 'x', {
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    })
    const yTo = gsap.quickTo(magnetic.current, 'y', {
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    })

    if (magnetic.current) {
      magnetic.current.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e
        if (!magnetic.current) return

        const { width, height, left, top } =
          magnetic.current.getBoundingClientRect()

        const x = clientX - (left + width / 2)
        const y = clientY - (top + height / 2)

        xTo(x * magneticPower)
        yTo(y * magneticPower)
      })

      magnetic.current.addEventListener('mouseleave', () => {
        xTo(0)
        yTo(0)
      })
    }
  }, [magneticPower])

  return cloneElement(children, {
    ref: magnetic,
  })
}

import { useState, useEffect } from 'react'

export function useMousePosition() {
  const [mousePos, setMousePos] = useState<{
    x: number
    y: number
  }>({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return {
    x: mousePos.x,
    y: mousePos.y,
  }
}

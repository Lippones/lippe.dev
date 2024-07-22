import { useEffect, useState } from 'react'

export function useMousePosition() {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    let animationFrameId: number

    const handleMouseMove = (event: MouseEvent) => {
      // Cancel the previous frame if needed
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }

      // Use requestAnimationFrame to batch updates
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x: event.clientX, y: event.clientY })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return {
    x: mousePos.x,
    y: mousePos.y,
  }
}

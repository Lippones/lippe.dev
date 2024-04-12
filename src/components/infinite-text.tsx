'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface InfiniteTextProps {
  texts: string[]
}

export function InfiniteText({ texts }: InfiniteTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      let next = index + 1
      if (next === texts.length) {
        next = 0
      }
      setIndex(next)
    }, 3 * 800)
  }, [index, setIndex, texts.length])

  const variants = {
    enter: () => {
      return {
        y: 20,
        opacity: 0,
      }
    },
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: () => {
      return {
        zIndex: 0,
        y: -40,
        opacity: 0,
      }
    },
  }

  return (
    <AnimatePresence>
      <div className="bg-background absolute -top-9 right-0 w-full h-8 z-50"></div>
      <motion.span
        style={{ position: 'absolute' }}
        variants={variants}
        key={index}
        className="ml-2"
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          // opacity: { duration: 1 },
          duration: 0.5,
        }}
      >
        {texts[index]}
      </motion.span>
    </AnimatePresence>
  )
}

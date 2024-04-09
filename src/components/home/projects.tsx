'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '../ui/button'
import { FaGithub } from 'react-icons/fa'
import Link from 'next/link'

export function Projects() {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-80%'])

  return (
    <section
      ref={targetRef}
      style={{
        height: 600 * 10,
      }}
      className={`relative flex max-w-screen-2xl w-full mx-auto px-4 md:px-8`}
    >
      <div className="sticky h-screen top-0 flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          <div className="w-[400px] flex-shrink-0 mr-36">
            <h2 className="text-3xl font-bold">Projects</h2>
            <p className="text-sm mt-2 text-pretty leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              architecto sunt tempore, totam fugit ea atque dignissimos
              obcaecati voluptate ad quisquam nemo, odio facere tenetur
              voluptatum dolor eligendi animi delectus!
            </p>
          </div>
          <div className="flex items-center">
            <ul className="flex flex-shrink-0 gap-6">
              {Array.from({ length: 10 }).map((_, index) => (
                <li
                  className="project bg-white rounded-2xl w-[600px] h-[600px] shadow-lg p-4"
                  key={index}
                >
                  Project {index + 1}
                </li>
              ))}
            </ul>
            <div className="ml-32 w-[400px] flex flex-col items-center">
              <h2 className="text-4xl font-bold">Ver mais projetos</h2>
              <Button
                variant={'outline'}
                className="rounded-full mt-8 h-20 w-full text-2xl font-semibold"
                asChild
              >
                <Link target="_blank" href="https://github.com/lippones">
                  Github <FaGithub className="ml-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { Button } from '../ui/button'
import { ProjectCard } from './project-card'

export type Project = {
  title: string
  description: string
  coverImageUrl: string
  slug: string
  tags: string[]
}

interface ProjectsProps {
  title: string
  description: string
  more: {
    title: string
    description: string
  }
  projects: Project[]
}

export function Projects({
  description,
  title,
  projects,
  more,
}: ProjectsProps) {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-80%'])

  const matches = useMediaQuery('(min-width: 768px)')

  const motionStyle = matches ? { x } : {}
  const [height, setHeight] = useState('auto')

  useEffect(() => {
    if (matches) {
      setHeight(`${600 * projects.length}px`)
    } else {
      setHeight('auto')
    }
  }, [matches, projects.length])

  return (
    <section
      ref={targetRef}
      style={{
        height, // Ajustar a altura somente se matches for verdadeiro
      }}
      className={`relative mx-auto flex w-full max-w-screen-2xl px-4 md:px-8`}
    >
      <div className="top-0 flex items-center overflow-hidden md:sticky md:h-screen">
        <motion.div style={motionStyle} className="flex flex-col md:flex-row">
          <div className="mr-36 md:w-[400px] md:flex-shrink-0">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="mt-2 text-pretty text-sm leading-relaxed">
              {description}
            </p>
          </div>
          <div className="mt-6 flex flex-col items-center gap-32 md:flex-row">
            <ul className="flex flex-col gap-6 md:flex-shrink-0 md:flex-row">
              {projects.map(
                ({ coverImageUrl, description, slug, tags, title }, index) => (
                  <li key={index}>
                    <ProjectCard
                      project={{
                        coverImageUrl,
                        description,
                        title,
                        slug,
                      }}
                      tags={tags}
                    />
                  </li>
                ),
              )}
            </ul>
            <div className="flex flex-col items-center max-md:mb-32 md:w-[400px]">
              <h2 className="text-4xl font-bold leading-relaxed">
                {more.title}
              </h2>
              <Button
                variant={'outline'}
                className="mt-8 h-20 w-full rounded-full text-2xl font-semibold"
                asChild
              >
                <Link target="_blank" href="/projects">
                  {more.description} <ArrowUpRight className="ml-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

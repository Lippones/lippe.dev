'use client'
import { useScroll, useTransform, motion } from 'framer-motion'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ProjectCard } from './project-card'
import { useMediaQuery } from 'usehooks-ts'
import { title } from 'process'

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
      className={`relative flex max-w-screen-2xl w-full mx-auto px-4 md:px-8`}
    >
      <div className="md:sticky md:h-screen top-0 flex items-center overflow-hidden">
        <motion.div style={motionStyle} className="flex flex-col md:flex-row">
          <div className="md:w-[400px] md:flex-shrink-0 mr-36">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-sm mt-2 text-pretty leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-32 md:flex-row items-center mt-6">
            <ul className="flex flex-col md:flex-row md:flex-shrink-0 gap-6">
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
            <div className="md:w-[400px] flex flex-col items-center max-md:mb-32">
              <h2 className="text-4xl leading-relaxed font-bold">
                {more.title}
              </h2>
              <Button
                variant={'outline'}
                className="rounded-full mt-8 h-20 w-full text-2xl font-semibold"
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

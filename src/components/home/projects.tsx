'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
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

  return (
    <section
      ref={targetRef}
      style={{
        height: 600 * 10,
      }}
      className={`relative flex max-w-screen-2xl w-full mx-auto px-4 md:px-8`}
    >
      <div className="sticky h-screen top-0 flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex flex-col md:flex-row">
          <div className="w-[400px] flex-shrink-0 mr-36">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-sm mt-2 text-pretty leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex items-center">
            <ul className="flex flex-shrink-0 gap-6">
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
            <div className="ml-32 w-[400px] flex flex-col items-center">
              <h2 className="text-4xl leading-relaxed font-bold">
                {more.title}
              </h2>
              <Button
                variant={'outline'}
                className="rounded-full mt-8 h-20 w-full text-2xl font-semibold"
                asChild
              >
                <Link target="_blank" href="https://github.com/lippones">
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

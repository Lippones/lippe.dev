'use client'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ProjectCard } from './project-card'
import { useMediaQuery } from 'usehooks-ts'

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
    target: targetRef
  })
  let x = useTransform(scrollYProgress, [0, 1], ['0%', '-80%'])

  const matches = useMediaQuery('(min-width: 768px)')

  if (!matches) {
    return (
      <section className='relative flex max-w-screen-2xl w-full mx-auto px-4 md:px-8'>
        <div className="md:sticky md:h-screen top-0 flex items-center overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-[400px] flex-shrink-0 mr-36">
              <h2 className="text-3xl font-bold">{title}</h2>
              <p className="text-sm mt-2 text-pretty leading-relaxed">
                {description}
              </p>
            </div>
            <div className="flex flex-col mt-12 gap-32 md:flex-row items-center">
              <ul className="flex flex-col md:flex-row md:flex-shrink-0 gap-12 md:gap-6">
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
              <div className="w-[400px] flex flex-col items-center max-md:mb-32">
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
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={targetRef}
      style={{
        height: 600 * projects.length
      }}
      className={`relative flex max-w-screen-2xl w-full mx-auto px-4 md:px-8`}
    >
      <div className="md:sticky md:h-screen top-0 flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex flex-col md:flex-row">
          <div className="w-[400px] flex-shrink-0 mr-36">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-sm mt-2 text-pretty leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-32 md:flex-row items-center">
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
            <div className="w-[400px] flex flex-col items-center max-md:mb-32">
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

'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '../ui/button'
import { FaGithub } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '../ui/badge'
import { ArrowUpRight } from 'lucide-react'

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
        <motion.div style={{ x }} className="flex flex-col md:flex-row">
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
                <li key={index}>
                  <ProjectCard
                    project={{
                      coverImageUrl:
                        'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                      description:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat architecto sunt tempore, totam fugit ea atque dignissimos obcaecati voluptate ad quisquam nemo, odio facere tenetur voluptatum dolor eligendi animi delectus!',
                      title: 'Project Title',
                      slug: 'project-title',
                    }}
                    tags={['React', 'TypeScript', 'TailwindCSS']}
                  />
                </li>
              ))}
            </ul>
            <div className="ml-32 w-[400px] flex flex-col items-center">
              <h2 className="text-4xl leading-relaxed font-bold">
                Did you find it interesting?
              </h2>
              <Button
                variant={'outline'}
                className="rounded-full mt-8 h-20 w-full text-2xl font-semibold"
                asChild
              >
                <Link target="_blank" href="https://github.com/lippones">
                  View more projects <ArrowUpRight className="ml-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: {
    title: string
    slug: string
    description: string
    coverImageUrl: string
  }
  tags: string[]
}

export function ProjectCard({ project, tags }: ProjectCardProps) {
  return (
    <div className="project relative rounded-2xl text-zinc-950 w-[600px] h-[600px] shadow-lg overflow-hidden before:w-full before:h-full before:absolute before:inset-0 before:bg-gradient-to-t before:to-transparent before:from-background/50">
      <Link href={`/project/${project.slug}`} className="h-full w-full">
        <Image
          src={project.coverImageUrl}
          width={1600}
          height={1600}
          className="h-full w-full object-cover"
          quality={100}
          alt={project.title}
        />
        <div className="absolute bottom-0 p-4">
          <ul className="flex gap-2 items-center flex-wrap">
            {tags.map((tag, index) => (
              <li key={index} className="">
                <Badge
                  className="px-4 bg-secondary/30 backdrop-blur-lg py-1.5"
                  variant={'secondary'}
                >
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </div>
  )
}

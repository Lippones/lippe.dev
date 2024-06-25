import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '../ui/badge'

interface ProjectCardProps {
  project: {
    title: string
    slug: string
    description: string
    coverImageUrl: string
  }
  tags: string[]
  showDescription?: boolean
}

export function ProjectCard({
  project,
  tags,
  showDescription,
}: ProjectCardProps) {
  return (
    <div className="project w-full text-zinc-950 md:w-[600px]">
      <Link
        href={`/project/${project.slug}`}
        className="relative w-full before:absolute before:inset-0 before:h-full before:w-full before:bg-gradient-to-t before:from-background/50 before:to-transparent"
      >
        <Image
          src={project.coverImageUrl}
          width={1600}
          height={1600}
          className="h-[400px] w-full overflow-hidden rounded-2xl border object-cover"
          quality={100}
          priority
          alt={project.title}
        />
        <div className="absolute bottom-0 p-4">
          <ul className="flex flex-wrap items-center gap-2">
            {tags.map((tag, index) => (
              <li key={index} className="">
                <Badge
                  className="bg-secondary/30 px-4 py-1.5 backdrop-blur-lg"
                  variant={'secondary'}
                >
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </Link>
      {showDescription && (
        <div className="mt-2">
          <p className="text-pretty text-muted-foreground">
            {project.description}
          </p>
        </div>
      )}
    </div>
  )
}

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
    <div className="project text-zinc-950 w-full md:w-[600px]">
      <Link
        href={`/project/${project.slug}`}
        className="w-full relative  before:w-full before:h-full before:absolute before:inset-0 before:bg-gradient-to-t before:to-transparent before:from-background/50"
      >
        <Image
          src={project.coverImageUrl}
          width={1600}
          height={1600}
          className="h-[400px] rounded-2xl overflow-hidden w-full object-cover"
          quality={100}
          priority
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
      {showDescription && (
        <div className="mt-2">
          <p className="text-muted-foreground text-pretty">
            {project.description}
          </p>
        </div>
      )}
    </div>
  )
}

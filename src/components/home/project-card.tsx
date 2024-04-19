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
}

export function ProjectCard({ project, tags }: ProjectCardProps) {
  return (
    <div className="project relative rounded-2xl text-zinc-950 w-[600px] h-[600px] shadow-lg overflow-hidden">
      <Link
        href={`/project/${project.slug}`}
        className="h-full w-full before:w-full before:h-full before:absolute before:inset-0 before:bg-gradient-to-t before:to-transparent before:from-background/50"
      >
        <Image
          src={project.coverImageUrl}
          width={1600}
          height={1600}
          className="h-full w-full object-cover"
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
    </div>
  )
}

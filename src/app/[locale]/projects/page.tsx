import { ProjectCard } from '@/components/home/project-card'
import { availableLocales } from '@/config'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ProjectsProps {
  params: {
    locale: string
  }
}

export default async function Projects({ params: { locale } }: ProjectsProps) {
  unstable_setRequestLocale(locale)

  if (!availableLocales.some((l) => l.locale === locale)) {
    return notFound()
  }

  const t = await getTranslations('pages.projects')

  const projects = ['EventFlow', 'DoBrasil', 'DEJORD', 'DevStore'] as const

  const projectData = projects.map((project) => {
    return {
      title: t(`items.${project}.title`),
      description: t(`items.${project}.description`),
      coverImageUrl: `/projects/${t(`items.${project}.image`)}`,
      slug: project,
      tags: t(`items.${project}.tags`).split(','),
    }
  })
  return (
    <div className="max-w-screen-2xl  w-full mx-auto px-4 md:px-8 mt-10 pb-10">
      <h1 className="text-4xl font-bold ">Meus projetos</h1>
      <p>
        {' '}
        <Link href="https://github.com/lippones">Github</Link>
      </p>
      <ul className="grid md:grid-cols-2 gap-6 gap-y-10 mt-10">
        {projectData.map(
          ({ coverImageUrl, description, title, slug, tags }) => (
            <li key={title}>
              <ProjectCard
                project={{
                  coverImageUrl,
                  description,
                  title,
                  slug,
                }}
                tags={tags}
                showDescription={true}
              />
            </li>
          ),
        )}
      </ul>
    </div>
  )
}

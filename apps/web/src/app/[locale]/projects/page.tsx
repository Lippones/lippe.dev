import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { ProjectCard } from '@/components/home/project-card'
import { availableLocales } from '@/config'

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

  const projects = [
    'EventFlow',
    'PeriniCabinets',
    'DoBrasil',
    'DEJORD',
    'IgniteCall',
    'Habits',
    'DevStore',
  ] as const

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
    <div className="mx-auto mt-10 w-full max-w-screen-2xl px-4 pb-10 md:px-8">
      <h1 className="text-4xl font-bold">Meus projetos</h1>
      <p>
        {' '}
        <Link href="https://github.com/lippones">Github</Link>
      </p>
      <ul className="mt-10 grid gap-6 gap-y-10 md:grid-cols-2">
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

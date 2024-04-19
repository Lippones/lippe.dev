/* eslint-disable react/no-unescaped-entities */
import { Hero } from '@/components/home/hero'
import { Projects } from '@/components/home/projects'
import { getTranslations } from 'next-intl/server'

export default async function Home() {
  const t = await getTranslations('pages.home')

  const projects = ['EventFlow', 'DoBrasil', 'DEJORD', 'DevStore'] as const

  const projectData = projects.map((project) => {
    return {
      title: t(`projects.items.${project}.title`),
      description: t(`projects.items.${project}.description`),
      coverImageUrl: `/projects/${t(`projects.items.${project}.image`)}.png`,
      slug: project,
      tags: t(`projects.items.${project}.tags`).split(','),
    }
  })

  return (
    <main className="h-full flex flex-col">
      <Hero
        title={t('hero.title')}
        contact={t('hero.contact_button')}
        description={t('hero.description')}
        getToKnowMe={t('hero.about_button')}
      />
      <Projects
        title={t('projects.title')}
        description={t('projects.description')}
        more={{
          title: t('projects.more.title'),
          description: t('projects.more.description'),
        }}
        projects={projectData}
      />
    </main>
  )
}

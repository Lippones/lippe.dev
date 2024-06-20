/* eslint-disable react/no-unescaped-entities */
import { notFound } from 'next/navigation'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { Hero } from '@/components/home/hero'
import { Projects } from '@/components/home/projects'
import { availableLocales } from '@/config'

interface HomePageProps {
  params: {
    locale: string
  }
}

export default async function Home({ params: { locale } }: HomePageProps) {
  unstable_setRequestLocale(locale)

  if (!availableLocales.some((l) => l.locale === locale)) {
    return notFound()
  }

  const t = await getTranslations('pages')

  const projects = ['EventFlow', 'DoBrasil', 'DEJORD', 'DevStore'] as const

  const projectData = projects.map((project) => {
    return {
      title: t(`projects.items.${project}.title`),
      description: t(`projects.items.${project}.description`),
      coverImageUrl: `/projects/${t(`projects.items.${project}.image`)}`,
      slug: project,
      tags: t(`projects.items.${project}.tags`).split(','),
    }
  })

  return (
    <main className="flex h-full flex-col">
      <Hero
        title={t('home.hero.title')}
        contact={t('home.hero.contact_button')}
        description={t('home.hero.description')}
        getToKnowMe={t('home.hero.about_button')}
      />
      <Projects
        title={t('projects.title')}
        description={t('projects.description')}
        more={{
          title: t('home.projects.more.title'),
          description: t('home.projects.more.description'),
        }}
        projects={projectData}
      />
    </main>
  )
}

import { notFound } from 'next/navigation'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'

import { availableLocales } from '@/config'

import { GuestBook } from './guest-book'
import { GuestSkeleton } from './guest-skeleton'

interface PageProps {
  params: {
    locale: string
  }
}

export default async function Page({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale)

  if (!availableLocales.some((l) => l.locale === locale)) {
    return notFound()
  }

  const t = await getTranslations('pages.guestbook')

  return (
    <div className="mx-auto min-h-screen w-full max-w-screen-2xl px-4 py-10 md:px-8">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="mt-2 max-w-[800px] text-pretty text-sm text-muted-foreground">
        {t('description')}
      </p>
      <Suspense fallback={<GuestSkeleton />}>
        <GuestBook />
      </Suspense>
    </div>
  )
}

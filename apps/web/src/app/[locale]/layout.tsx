/* eslint-disable camelcase */
import '../globals.css'

import { env } from '@lippe/env'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { createTranslator } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { Providers } from '@/components/providers'
import { availableLocales, navigationPaths, userData } from '@/config'

const inter = Inter({ subsets: ['latin'], variable: '--inter' })
const nexa = localFont({
  src: [
    {
      path: '../../fonts/Nexa_Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../fonts/Nexa_Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/Nexa_Light.otf',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--nexa',
})

const locales = availableLocales.map(({ locale }) => locale)

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const isValidLocale = locales.some((param) => param === locale)
  if (!isValidLocale) notFound()

  unstable_setRequestLocale(locale)

  const [paths, t] = await Promise.all([navigationPaths(), getTranslations()])

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${nexa.variable}`}>
        <Providers
          hireMe={{
            text: t('navigation.hire.label'),
            href: t('navigation.hire.href'),
          }}
          paths={paths}
          locale={locale}
        >
          {children}
        </Providers>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const messages = await import(`/messages/${locale}.json`)
  const t = createTranslator({ locale, messages })

  const languages: Record<string, URL> = {}

  return {
    title: {
      template: '%s',
      default: t('config.metadata.title'),
    },
    description: t('config.metadata.description'),
    authors: [
      {
        name: userData.name,
      },
    ],
    creator: 'Filipe Vieira',
    publisher: userData.name,
    alternates: {
      languages,
    },
    metadataBase: new URL(env.NEXT_PUBLIC_URL),
  }
}

/* eslint-disable camelcase */
import '../globals.css'

import { Analytics } from '@vercel/analytics/react'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { createTranslator } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { DevelopmentAlert } from '@/components/development-alert'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { LenisScrollProvider } from '@/components/lenis-scroll-provider'
import { Profile } from '@/components/profile'
import { QueryClientProvider } from '@/components/query-client-provider'
import { ThanksInviteDialog } from '@/components/thanks-invite-dialog'
import { ThemeProvider } from '@/components/theme-provider'
import { TransitionPage } from '@/components/transition-page'
import { Toaster } from '@/components/ui/sonner'
import { availableLocales, userData } from '@/config'
import { navigationPaths } from '@/config/navigation-paths'
import { InternalizationProvider } from '@/context/i18n'

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

  const [paths, t] = await Promise.all([
    navigationPaths(),
    getTranslations('development-alert'),
  ])

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${nexa.variable}`}>
        <QueryClientProvider>
          <InternalizationProvider locale={locale}>
            <ThemeProvider
              attribute="class"
              forcedTheme="dark"
              defaultTheme="dark"
            >
              <LenisScrollProvider>
                <TransitionPage>
                  <div className="flex min-h-screen flex-1 flex-col pb-6">
                    <Header paths={paths} />
                    {children}
                    <Analytics />
                    <Toaster />
                    <ThanksInviteDialog />
                    <DevelopmentAlert
                      button={t('button')}
                      title={t('title')}
                      description={t('description')}
                      isAlertConfirmed={false}
                    />
                    <Footer />
                  </div>
                  <Profile />
                </TransitionPage>
              </LenisScrollProvider>
            </ThemeProvider>
          </InternalizationProvider>
        </QueryClientProvider>
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
  }
}

/* eslint-disable camelcase */
import { Inter } from 'next/font/google'
import '../globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { QueryClientProvider } from '@/components/query-client-provider'
import { LenisScrollProvider } from '@/components/lenis-scroll-provider'
import { Profile } from '@/components/profile'
import { TransitionPage } from '@/components/transition-page'
import { Footer } from '@/components/footer'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from '@/components/ui/sonner'
import localFont from 'next/font/local'
import { ThanksInviteDialog } from '@/components/thanks-invite-dialog'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { availableLocales } from '@/config'
import { navigationPaths } from '@/config/navigation-paths'
import { DevelopmentAlert } from '@/components/development-alert'
import { cookies } from 'next/headers'

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
  unstable_setRequestLocale(locale)
  const paths = await navigationPaths()
  const isAlertConfirmed = cookies().get('isAlertConfirmed')?.value === 'true'
  const t = await getTranslations()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${nexa.variable}`}>
        <QueryClientProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <LenisScrollProvider>
              <TransitionPage>
                <div className="flex flex-col flex-1 min-h-screen pb-6">
                  <Header paths={paths} />
                  {children}
                  <Analytics />
                  <Toaster />
                  <ThanksInviteDialog />
                  <DevelopmentAlert
                    button={t('development-alert.button')}
                    title={t('development-alert.title')}
                    description={t('development-alert.description')}
                    isAlertConfirmed={isAlertConfirmed}
                  />
                  <Footer />
                </div>
                <Profile />
              </TransitionPage>
            </LenisScrollProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}

// export function generateStaticParams() {
//   return locales.map((locale) => ({ locale }))
// }

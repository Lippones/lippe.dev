import { Analytics } from '@vercel/analytics/react'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { LenisScrollProvider } from '@/components/lenis-scroll-provider'
import { Profile } from '@/components/profile'
import { QueryClientProvider } from '@/components/query-client-provider'
import { ThanksInviteDialog } from '@/components/thanks-invite-dialog'
import { ThemeProvider } from '@/components/theme-provider'
import { TransitionPage } from '@/components/transition-page'
import { Toaster } from '@/components/ui/sonner'
import { InternalizationProvider } from '@/context/i18n'

import { Cursors } from './home/cursors'

interface ProvidersProps {
  children: React.ReactNode
  locale: string
  paths: {
    label: string
    href: string
  }[]
  hireMe: {
    text: string
    href: string
  }
}

export function Providers({ children, locale, paths, hireMe }: ProvidersProps) {
  return (
    <QueryClientProvider>
      <InternalizationProvider locale={locale}>
        <ThemeProvider attribute="class" forcedTheme="dark" defaultTheme="dark">
          <LenisScrollProvider>
            <TransitionPage>
              <div className="flex min-h-screen flex-1 flex-col pb-6">
                <Header paths={paths} hireMe={hireMe} />
                {children}
                <Analytics />
                <Toaster />
                <ThanksInviteDialog />
                <Footer />
                <Cursors />
              </div>
              <Profile />
            </TransitionPage>
          </LenisScrollProvider>
        </ThemeProvider>
      </InternalizationProvider>
    </QueryClientProvider>
  )
}

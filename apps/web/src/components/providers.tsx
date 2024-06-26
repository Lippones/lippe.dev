import { Analytics } from '@vercel/analytics/react'

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
import { InternalizationProvider } from '@/context/i18n'

interface ProvidersProps {
  children: React.ReactNode
  locale: string
  paths: {
    label: string
    href: string
  }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  developmentAlert: {
    title: string
    description: string
    button: string
  }
}

export function Providers({
  children,
  locale,
  paths,
  developmentAlert: { button, description, title },
}: ProvidersProps) {
  return (
    <QueryClientProvider>
      <InternalizationProvider locale={locale}>
        <ThemeProvider attribute="class" forcedTheme="dark" defaultTheme="dark">
          <LenisScrollProvider>
            <TransitionPage>
              <div className="flex min-h-screen flex-1 flex-col pb-6">
                <Header paths={paths} />
                {children}
                <Analytics />
                <Toaster />
                <ThanksInviteDialog />
                <DevelopmentAlert
                  button={button}
                  title={title}
                  description={description}
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
  )
}

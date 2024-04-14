import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
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

const inter = Inter({ subsets: ['latin'], variable: '--inter' })
const nexa = localFont({
  src: [
    {
      path: '../fonts/Nexa_Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Nexa_Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Nexa_Light.otf',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--nexa',
})

export const metadata: Metadata = {
  title: 'Filipe Vieira',
  description: 'Portfolio of Filipe Vieira',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${nexa.variable}`}>
        <QueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            // enableSystem
            // disableTransitionOnChange
          >
            <LenisScrollProvider>
              <TransitionPage>
                <div className="flex flex-col flex-1 min-h-screen pb-6">
                  <Header
                    paths={[
                      { label: 'Home', href: '/' },
                      { label: 'Projects', href: '/projects' },
                      { label: 'About', href: '/about' },
                      { label: 'Contact', href: '/contact' },
                    ]}
                  />
                  {children}
                  <Analytics />
                  <Toaster />
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

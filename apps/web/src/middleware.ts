import { auth } from '@lippe/auth'
import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import { availableLocales } from './config'

const privatePages = ['/config']

const { locale: defaultLocale } = availableLocales.find(
  ({ default: isDefault }) => isDefault,
)!

const intlMiddleware = createIntlMiddleware({
  locales: availableLocales.map(({ locale }) => locale),
  defaultLocale,
  localeDetection: true,
})

export default async function middleware(req: NextRequest) {
  const locales = availableLocales.map(({ locale }) => locale)

  const privatePathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${privatePages.join('|')})$`,
    'i',
  )

  const isPrivatePage = privatePathnameRegex.test(req.nextUrl.pathname)

  if (isPrivatePage) {
    const session = await auth()

    if (!session || session.user?.role !== 'admin') {
      // return NextResponse.redirect(new URL('/', req.url))
    }

    return intlMiddleware(req)
  } else {
    return intlMiddleware(req)
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}

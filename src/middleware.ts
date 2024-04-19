import createMiddleware from 'next-intl/middleware'
import { availableLocales } from './config'

const { locale: defaultLocale } = availableLocales.find(
  ({ default: isDefault }) => isDefault,
)!

export default createMiddleware({
  locales: availableLocales.map(({ locale }) => locale),
  defaultLocale,
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}

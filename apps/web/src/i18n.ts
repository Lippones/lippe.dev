import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

import { availableLocales } from './config'

const locales = availableLocales.map(({ locale }) => locale)

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound()

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})

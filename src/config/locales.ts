export type Locale = {
  label: string
  locale: string
  default?: boolean
}
export const availableLocales: Locale[] = [
  {
    label: 'English',
    locale: 'en',
    default: true,
  },
  {
    label: 'Português',
    locale: 'pt-BR',
  },
]

import { getTranslations } from "next-intl/server"

export type Path = {
  label: string
  href: string
}

const paths = ['home', 'projects', 'about', 'contact'] as const


export async function navigationPaths() {
  const t = await getTranslations('navigation')

  return paths.map((path) => ({
    label: t(`${path}.label`),
    href: t(`${path}.href`)
  }))
}
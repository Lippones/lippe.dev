import Image from 'next/image'
import BannerGif from '@/assets/sanji.gif'
import Me from '@/assets/profile.png'
import { ArrowDown, Dot } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { InfiniteText } from '@/components/infinite-text'
import dayjs from 'dayjs'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { availableLocales } from '@/config'
import { notFound } from 'next/navigation'
dayjs.extend(customParseFormat)

interface AboutPageProps {
  params: {
    locale: string
  }
}

export default async function About({ params: { locale } }: AboutPageProps) {
  unstable_setRequestLocale(locale)

  if (!availableLocales.some((l) => l.locale === locale)) {
    return notFound()
  }

  const t = await getTranslations('pages.about')

  const highlights = [
    'development',
    'design',
    'the_full_package',
    'problem-solving',
    'project_management',
    'continuous_learning',
  ] as const
  const experience = ['freelancer', 'bttis'] as const

  const skills = t('skills.items').split('|')
  const interest = t('interest.items').split(',')
  const currentProjects = t('current_projects.items').split(',')

  const highlightsItems = highlights.map((highlight) => {
    return {
      title: t(`highlights.items.${highlight}.title`),
      description: t(`highlights.items.${highlight}.description`),
    }
  })

  const experienceItems = experience.map((experience) => {
    const finalDate = t(`experience.items.${experience}.final_date`)

    return {
      title: t(`experience.items.${experience}.title`),
      company: t(`experience.items.${experience}.company`),
      initialDate: dayjs(
        t(`experience.items.${experience}.initial_date`),
        'YYYY/MM/DD',
      ).toDate(),
      // Unfortunately the library does not support null values
      finalDate:
        finalDate === 'Atual'
          ? null
          : dayjs(
              t(`experience.items.${experience}.final_date`),
              'YYYY/MM/DD',
            ).toDate(),
    }
  })

  return (
    <div className="max-w-screen-2xl  w-full mx-auto px-4 md:px-8 pb-10">
      <div className="mt-12 grid md:grid-cols-2 items-center gap-8 md:gap-12 md:gap-y-28">
        <div>
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <span className="mt-6 text-muted-foreground flex">
            {t('description')} <ArrowDown className="ml-2" />
          </span>
        </div>
        <Image
          src={BannerGif}
          alt="Sanji cooking"
          className="rounded-2xl w-full"
        />
        <Image
          quality={100}
          className="rounded-2xl max-h-[500px] object-cover"
          src={Me}
          alt="Me"
        />
        <p className="text-foreground/80 text-pretty">{t('biography')}</p>
      </div>
      <div className="mt-20">
        <h2 className="text-4xl font-bold relative">
          {t('highlights.title')}{' '}
          <InfiniteText texts={highlightsItems.map((item) => item.title)} />
        </h2>
        <ul className="mt-6 grid md:grid-cols-3 gap-8">
          {highlightsItems.map((item, index) => (
            <li key={index} className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <Separator />
              <h3 className="font-semibold capitalize">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-20 grid sm:grid-cols-[300px_300px] gap-x-8 gap-y-12">
        <div>
          <h2 className="text-2xl font-bold">{t('skills.title')}</h2>
          <ul className="mt-6 flex flex-col gap-2">
            {skills.map((skill, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{t('interest.title')}</h2>
          <ul className="mt-6 flex flex-col gap-2">
            {interest.map((item, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{t('current_projects.title')}</h2>
          <ul className="mt-6 flex flex-col gap-2">
            {currentProjects.map((item, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{t('experience.title')}</h2>
          <ul className="mt-6 flex flex-col gap-2">
            {experienceItems.map((item, index) => (
              <li key={index}>
                <ExperienceCard
                  company={item.company}
                  role={item.title}
                  startDate={item.initialDate}
                  endDate={item.finalDate}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

interface ExperienceCardProps {
  company: string
  role: string
  startDate: Date
  endDate: Date | null
}

function ExperienceCard({
  company,
  role,
  startDate,
  endDate,
}: ExperienceCardProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{role}</h3>
      <div className="flex  text-muted-foreground items-center">
        <p className="text-sm">{company}</p>
        <Dot className="h-8 w-8" />
        <p className="text-sm">
          {dayjs(startDate).get('year')} -{' '}
          {endDate ? dayjs(endDate).get('year') : 'Atual'}
        </p>
      </div>
    </div>
  )
}

import Image from 'next/image'
import BannerGif from '@/assets/sanji.gif'
import Me from '@/assets/profile.png'
import { ArrowDown, Dot } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { InfiniteText } from '@/components/infinite-text'
import dayjs from 'dayjs'
import { getTranslations } from 'next-intl/server'

export default async function About() {
  const t = await getTranslations('pages.about')
  return (
    <div className="max-w-screen-2xl  w-full mx-auto px-4 md:px-8 pb-10">
      <div className="mt-12 grid grid-cols-2 items-center gap-12 gap-y-28">
        <div>
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <span className="mt-6 text-muted-foreground flex">
            {t('description')} <ArrowDown className="ml-2" />
          </span>
        </div>
        <Image
          src={BannerGif}
          alt="Banner image"
          className="rounded-2xl w-full"
        />
        <Image
          quality={100}
          className="rounded-2xl max-h-[500px] object-cover"
          src={Me}
          alt="Minha foto"
        />
        <p className="text-foreground/80 text-pretty">{t('biography')}</p>
      </div>
      <div className="mt-20">
        <h2 className="text-4xl font-bold relative">
          Posso te ajudar em{' '}
          <InfiniteText
            texts={[
              'desenvolvimento de software',
              'desenvolvimento de software',
              'desenvolvimento de software',
            ]}
          />{' '}
        </h2>
        <ul className="mt-6 grid md:grid-cols-3 gap-8">
          <li className="flex flex-col gap-2 mt-4">
            <span className="text-sm text-muted-foreground">01.</span>
            <Separator />
            <h3 className="font-semibold">Desenvolvimento de software</h3>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              aliquam repellat dolore hic distinctio. Ea mollitia tenetur soluta
              iure enim ipsa veritatis sunt quam sint doloribus. Eveniet
              voluptatum delectus veniam?
            </p>
          </li>
          <li className="flex flex-col gap-2 mt-4">
            <span className="text-sm text-muted-foreground">02.</span>
            <Separator />
            <h3 className="font-semibold">Desenvolvimento de software</h3>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              aliquam repellat dolore hic distinctio. Ea mollitia tenetur soluta
              iure enim ipsa veritatis sunt quam sint doloribus. Eveniet
              voluptatum delectus veniam?
            </p>
          </li>
          <li className="flex flex-col gap-2 mt-4">
            <span className="text-sm text-muted-foreground">03.</span>
            <Separator />
            <h3 className="font-semibold">Desenvolvimento de software</h3>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              aliquam repellat dolore hic distinctio. Ea mollitia tenetur soluta
              iure enim ipsa veritatis sunt quam sint doloribus. Eveniet
              voluptatum delectus veniam?
            </p>
          </li>
        </ul>
      </div>
      <div className="mt-20 grid grid-cols-[300px_300px] gap-x-8 gap-y-12">
        <div>
          <h2 className="text-2xl font-bold">Areas of expertise</h2>
          <ul className="mt-6 flex flex-col gap-2">
            <li className="text-sm text-muted-foreground">
              Front-end development
            </li>
            <li className="text-sm text-muted-foreground">
              Back-end development
            </li>
            <li className="text-sm text-muted-foreground">Design</li>
            <li className="text-sm text-muted-foreground">DevOps</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Currently learning</h2>
          <ul className="mt-6 flex flex-col gap-2">
            <li className="text-sm text-muted-foreground">
              Front-end development
            </li>
            <li className="text-sm text-muted-foreground">
              Back-end development
            </li>
            <li className="text-sm text-muted-foreground">Design</li>
            <li className="text-sm text-muted-foreground">DevOps</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Personal interests</h2>
          <ul className="mt-6 flex flex-col gap-2">
            <li className="text-sm text-muted-foreground">
              Front-end development
            </li>
            <li className="text-sm text-muted-foreground">
              Back-end development
            </li>
            <li className="text-sm text-muted-foreground">Design</li>
            <li className="text-sm text-muted-foreground">DevOps</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Current projects</h2>
          <ul className="mt-6 flex flex-col gap-2">
            <li className="text-sm text-muted-foreground">
              Front-end development
            </li>
            <li className="text-sm text-muted-foreground">
              Back-end development
            </li>
            <li className="text-sm text-muted-foreground">Design</li>
            <li className="text-sm text-muted-foreground">DevOps</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Carreira</h2>
          <ul className="mt-6 flex flex-col gap-2">
            <li>
              <ExperienceCard
                company="Bttis"
                role="Desenvolvedor Full Stack"
                startDate={new Date()}
                endDate={new Date()}
              />
            </li>
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
  endDate?: Date
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
        <p className="text-sm">Empresa {company}</p>
        <Dot className="h-8 w-8" />
        <p className="text-sm">
          {dayjs(startDate).get('year')} -{' '}
          {endDate ? dayjs(endDate).get('year') : 'Atual'}
        </p>
      </div>
    </div>
  )
}

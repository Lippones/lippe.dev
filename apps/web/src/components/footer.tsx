import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import { socais } from '@/config/socias'

import { ContactCard } from './contact-card'
import { Magnetic } from './magnetic'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export async function Footer() {
  const t = await getTranslations('footer')
  return (
    <footer
      id="footer"
      className="mx-auto grid min-h-[400px] w-full max-w-screen-2xl justify-items-end gap-6 rounded-2xl border bg-secondary/60 px-4 py-6 md:px-8 lg:grid-cols-2"
    >
      <div className="flex flex-col justify-between">
        <div>
          <Image src="/logo.svg" width={30} height={30} alt="Logo" />
          <p className="mt-4 text-pretty leading-relaxed">{t('description')}</p>
        </div>
        <Separator className="my-4" />
        <div className="">
          <h3 className="text-pretty font-semibold">{t('contact.title')}</h3>
          <ul className="mt-2 flex flex-col gap-2 rounded-full">
            <li className="text-sm text-muted-foreground">
              <Magnetic magneticPower={0.2}>
                <Button asChild className="rounded-full" variant={'link'}>
                  <Link
                    href={`https://wa.me/5533998484690?text=${t('contact.message')}`}
                  >
                    +55 33 99848-3690
                  </Link>
                </Button>
              </Magnetic>
            </li>
            <li className="text-sm text-muted-foreground">
              <Magnetic magneticPower={0.2}>
                <Button asChild className="rounded-full" variant={'link'}>
                  <Link href="mailto:filipe68ft@hotmail.com">
                    filipe68ft@hotmail.com
                  </Link>
                </Button>
              </Magnetic>
            </li>
          </ul>
        </div>
        <span className="mt-2 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Filipe Vieira. {t('copyright')}.
        </span>
        <span className="mt-2 text-sm text-muted-foreground">
          {t('thanks')}
        </span>
      </div>
      <div className="flex w-full flex-col justify-between gap-6 lg:w-[500px]">
        <ContactCard
          description={t('work_with_me.description')}
          title={t('work_with_me.title')}
          textArea={t('work_with_me.textArea')}
          button={t('work_with_me.button').split(',')}
        />
        <div className="flex w-full items-center justify-between rounded-lg border bg-background/60 px-6 py-3 backdrop-blur-md">
          <span className="font-semibold">{t('follow')}</span>
          <ul className="flex items-center gap-2">
            <li>
              <Button className="" variant={'outline'} size={'icon'} asChild>
                <Link target="_blank" href={socais.twitter}>
                  <FaXTwitter />
                </Link>
              </Button>
            </li>
            <li>
              <Button className="" variant={'outline'} size={'icon'} asChild>
                <Link target="_blank" href={socais.github}>
                  <FaGithub />
                </Link>
              </Button>
            </li>
            <li>
              <Button className="" variant={'outline'} size={'icon'} asChild>
                <Link target="_blank" href={socais.instagram}>
                  <FaInstagram />
                </Link>
              </Button>
            </li>
            <li>
              <Button className="" variant={'outline'} size={'icon'} asChild>
                <Link target="_blank" href={socais.linkedin}>
                  <FaLinkedin />
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

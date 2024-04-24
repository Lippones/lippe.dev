import { Button } from './ui/button'
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import Link from 'next/link'
import { Magnetic } from './magnetic'
import Image from 'next/image'
import { ContactCard } from './contact-card'
import { getTranslations } from 'next-intl/server'
import { socais } from '@/config/socias'
import { Separator } from './ui/separator'

export async function Footer() {
  const t = await getTranslations('footer')
  return (
    <footer className="min-h-[400px] gap-6 grid lg:grid-cols-2 bg-secondary/60 justify-items-end py-6 max-w-screen-2xl w-full mx-auto px-4 md:px-8 border rounded-2xl">
      <div className="flex flex-col justify-between">
        <div>
          <Image src="/logo.svg" width={30} height={30} alt="Logo" />
          <p className="text-pretty leading-relaxed mt-4">
            {t('description')}
          </p>
        </div>
        <Separator className='my-4' />
        <div className=''>
          <h3 className="font-semibold text-pretty">{
            t('contact.title')
          }</h3>
          <ul className="mt-2 flex flex-col gap-2 rounded-full">
            <li className="text-sm text-muted-foreground">
              <Magnetic magneticPower={0.2}>
                <Button asChild className="rounded-full" variant={'link'}>
                  <Link href={`https://wa.me/5533998484690?text=${t('contact.message')}`}>+55 33 99848-3690</Link>
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
        <span className="text-sm text-muted-foreground mt-2">
          © {new Date().getFullYear()} Filipe Vieira. {t('copyright')}.
        </span>
        <span className="text-sm text-muted-foreground mt-2">
          {t('thanks')}
        </span>
      </div>
      <div className="flex w-full flex-col gap-6 justify-between lg:w-[500px]">
        <ContactCard description={t('work_with_me.description')} title={t('work_with_me.title')} textArea={t('work_with_me.textArea')} button={t('work_with_me.button').split(',')} />
        <div className="flex w-full justify-between bg-background/60 border backdrop-blur-md rounded-lg px-6 py-3 items-center">
          <span className="font-semibold">{t('follow')}</span>
          <ul className="flex gap-2 items-center">
            <li>
              <Button className="" variant={'outline'} size={'icon'} asChild>
                <Link target='_blank' href={socais.twitter}>
                  <FaXTwitter />
                </Link>
              </Button>
            </li>
            <li>
              <Button className="" variant={'outline'} size={'icon'} asChild>
                <Link target='_blank' href={socais.github}>
                  <FaGithub />
                </Link>
              </Button>
            </li>
            <li>
              <Button className="" variant={'outline'} size={'icon'} asChild>
                <Link target='_blank' href={socais.instagram}>
                  <FaInstagram />
                </Link>
              </Button>
            </li>
            <li>
              <Button className="" variant={'outline'} size={'icon'} asChild>
                <Link target='_blank' href={socais.linkedin}>
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

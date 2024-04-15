import { Button } from './ui/button'
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import Link from 'next/link'
import { Magnetic } from './magnetic'
import Image from 'next/image'
import { ContactCard } from './contact-card'

export function Footer() {
  return (
    <footer className="min-h-[400px] grid grid-cols-2 bg-secondary/60 justify-items-end py-6 max-w-screen-2xl w-full mx-auto px-4 md:px-8 border rounded-2xl">
      <div className="flex flex-col justify-between">
        <div>
          <Image src="/logo.svg" width={30} height={30} alt="Logo" />
          <p className="text-pretty leading-relaxed mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eius
            dignissimos esse doloremque, aperiam modi molestiae suscipit
            consectetur ex laboriosam assumenda. Harum laboriosam earum fugiat
            natus quo asperiores possimus maiores.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-pretty">Contact</h3>
          <ul className="mt-2 flex flex-col gap-2 rounded-full">
            <li className="text-sm text-muted-foreground">
              <Magnetic magneticPower={0.2}>
                <Button asChild className="rounded-full" variant={'link'}>
                  <Link href="tel:+351912345678">+55 33 9848-3690</Link>
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
        <span className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Filipe Vieira. All rights reserved.
        </span>
      </div>
      <div className="flex flex-col gap-6 justify-between">
        <ContactCard />
        <div className="flex w-full justify-between bg-background/60 border backdrop-blur-md rounded-lg px-6 py-3 items-center">
          <span className="font-semibold">Follow us</span>
          <ul className="flex gap-2 items-center">
            <li>
              <Button className="" variant={'outline'} size={'icon'}>
                <FaXTwitter />
              </Button>
            </li>
            <li>
              <Button className="" variant={'outline'} size={'icon'}>
                <FaGithub />
              </Button>
            </li>
            <li>
              <Button className="" variant={'outline'} size={'icon'}>
                <FaInstagram />
              </Button>
            </li>
            <li>
              <Button className="" variant={'outline'} size={'icon'}>
                <FaLinkedin />
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

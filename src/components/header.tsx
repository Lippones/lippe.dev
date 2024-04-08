'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Separator } from './ui/separator'
import { usePathname } from 'next/navigation'
import { Magnetic } from './magnetic'

type path = {
  label: string
  href: string
}

const paths: path[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-4 flex w-full justify-between">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" width={40} height={40} alt="Logo" />
          <span className="text-3xl font-semibold">LP.</span>
        </Link>
        <Button variant={'outline'} className="border-dashed">
          Hire me
        </Button>
      </div>
      <Button
        onClick={() => {
          setOpen((state) => !state)
        }}
        variant="ghost"
      >
        <Menu className="w-5 h-5" />
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/80">
          <div className="fixed h-full w-[30vw] top-0 right-0 bg-background rounded-l-lg shadow-lg p-8 border border-border">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Navigation</span>
              <Magnetic magneticPower={1}>
                <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white">
                  <X className="h-6 w-6 text-background" />
                </button>
              </Magnetic>
            </div>
            <Separator className="my-8" />
            <ul className="flex flex-col gap-4">
              {paths.map((path) => {
                const isCurrentPath = pathname.includes(path.href)
                return (
                  <li key={path.label}>
                    <Magnetic magneticPower={0.2}>
                      <Link
                        className={`text-4xl tracking-wide group flex items-center gap-2 max-w-fit before:w-2 before:h-2 before:rounded-full before:bg-primary  ${isCurrentPath ? 'before:block' : 'before:hidden'}`}
                        href={path.href}
                      >
                        {path.label}{' '}
                        <ArrowUpRight className="h-8 w-8 group-hover:opacity-100 opacity-0 -translate-x-8  group-hover:translate-x-0 transition-all" />
                      </Link>
                    </Magnetic>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}

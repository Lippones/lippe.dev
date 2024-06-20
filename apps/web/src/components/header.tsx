'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { Path } from '@/config/navigation-paths'

import { Magnetic } from './magnetic'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

interface HeaderProps {
  paths: Path[]
}

export function Header({ paths }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const currentPath = pathname.split('/')[2]

  return (
    <header className="mx-auto flex h-[10vh] w-full max-w-screen-2xl items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image src="/logo.svg" width={40} height={40} alt="Logo" />
        </Link>
        <Button variant={'outline'} className="border-dashed border-foreground">
          Hire me
        </Button>
      </div>
      <nav>
        <ul className="flex gap-8 max-md:hidden">
          {paths.map((path) => {
            const matchesPathName =
              currentPath === undefined && path.href === '/'
                ? true
                : `/${currentPath}` === path.href
            return (
              <li key={path.label}>
                <Magnetic>
                  <Link
                    className={`group flex max-w-fit flex-col-reverse items-center gap-2 tracking-wide before:h-2 before:w-2 before:rounded-full before:bg-primary ${matchesPathName ? 'before:block' : 'before:hidden'}`}
                    href={path.href}
                  >
                    {path.label}
                  </Link>
                </Magnetic>
              </li>
            )
          })}
        </ul>
      </nav>
      <Button
        onClick={() => {
          setOpen((state) => !state)
        }}
        variant="ghost"
        size={'icon'}
        className="md:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <AnimatePresence mode="wait">
        {open && (
          <NavBar
            paths={paths}
            pathname={pathname}
            handleOpenChange={setOpen}
          />
        )}
      </AnimatePresence>
    </header>
  )
}

interface NavBarProps {
  paths: Path[]
  pathname: string
  handleOpenChange: (state: boolean) => void
}

export function NavBar({ paths, pathname, handleOpenChange }: NavBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // transition={{ duration: 0.4 }}
      onClick={() => {
        handleOpenChange(false)
      }}
      className="fixed inset-0 z-50 bg-black/80"
    >
      <motion.nav
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: '0%' }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ ease: 'easeInOut', duration: 0.5 }}
        className="fixed right-0 top-0 h-full w-[80vw] rounded-l-lg border border-border bg-background p-8 shadow-lg md:w-[500px]"
      >
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Navigation</span>
          <Magnetic magneticPower={1}>
            <button
              onClick={() => {
                handleOpenChange(false)
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white"
            >
              <X className="h-6 w-6 text-background" />
            </button>
          </Magnetic>
        </div>
        <Separator className="my-8" />
        <ul className="flex flex-col gap-4">
          {paths.map((path, i) => {
            const isCurrentPath = pathname === path.href
            return (
              <motion.li
                exit={{ opacity: 0, x: 400 }}
                initial={{ opacity: 0, x: 400 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  ease: 'easeOut',
                  duration: 0.5,
                  delay: i * 0.05,
                }}
                key={path.label}
              >
                <Magnetic magneticPower={0.2}>
                  <Link
                    className={`group flex max-w-fit items-center gap-2 text-4xl tracking-wide before:h-2 before:w-2 before:rounded-full before:bg-primary ${isCurrentPath ? 'before:block' : 'before:hidden'}`}
                    href={path.href}
                  >
                    {path.label}{' '}
                    <ArrowUpRight className="h-8 w-8 -translate-x-8 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </Magnetic>
              </motion.li>
            )
          })}
        </ul>
      </motion.nav>
    </motion.div>
  )
}

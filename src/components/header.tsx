'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Separator } from './ui/separator'
import { usePathname } from 'next/navigation'
import { Magnetic } from './magnetic'
import { motion, AnimatePresence } from 'framer-motion'
import { Path } from '@/config/navigation-paths'

interface HeaderProps {
  paths: Path[]
}

export function Header({ paths }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const currentPath = pathname.split('/')[2]

  return (
    <header className="max-w-screen-2xl mx-auto px-4 md:px-8 h-[10vh] flex items-center w-full justify-between">
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
            console.log(path)
            console.log(currentPath)
            const matchesPathName =
              currentPath === undefined && path.href === '/'
                ? true
                : `/${currentPath}` === path.href
            return (
              <li key={path.label}>
                <Magnetic>
                  <Link
                    className={`tracking-wide group flex flex-col-reverse items-center gap-2 max-w-fit before:w-2 before:h-2 before:rounded-full before:bg-primary  ${matchesPathName ? 'before:block' : 'before:hidden'}`}
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
        <Menu className="w-5 h-5" />
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
        className="fixed h-full w-[80vw] md:w-[500px] top-0 right-0 bg-background rounded-l-lg shadow-lg p-8 border border-border"
      >
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Navigation</span>
          <Magnetic magneticPower={1}>
            <button
              onClick={() => {
                handleOpenChange(false)
              }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white"
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
                    className={`text-4xl tracking-wide group flex items-center gap-2 max-w-fit before:w-2 before:h-2 before:rounded-full before:bg-primary  ${isCurrentPath ? 'before:block' : 'before:hidden'}`}
                    href={path.href}
                  >
                    {path.label}{' '}
                    <ArrowUpRight className="h-8 w-8 group-hover:opacity-100 opacity-0 -translate-x-8  group-hover:translate-x-0 transition-all" />
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

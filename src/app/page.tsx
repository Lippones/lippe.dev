/* eslint-disable react/no-unescaped-entities */
import { Hero } from '@/components/home/hero'
import { Projects } from '@/components/home/projects'

export default function Home() {
  return (
    <main className="h-full flex flex-col">
      <Hero />
      <Projects />
    </main>
  )
}

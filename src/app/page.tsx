/* eslint-disable react/no-unescaped-entities */
import { Profile } from '@/components/profile'
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'

export default function Home() {
  return (
    <section className="flex-grow flex items-center max-w-screen-2xl w-full mx-auto px-4 md:px-8 relative">
      <div className="">
        <div>
          <h1 className="text-3xl font-bold">
            Hey, I'm Filipe - FullStack Developer 👋
          </h1>
          <p className="text-sm text-pretty md:max-w-[50%] mt-6">
            I love diving deep into the world of technology and innovation. With
            solid experience in Javascript, Typescript, ReactJS, Next and
            Node.js, I am always ready to offer innovative, high-quality
            solutions that help companies achieve their business goals.
          </p>
        </div>
        <div className="flex gap-4 items-center mt-6">
          <Button>
            Get to know me <MoveRight className="ml-2" />
          </Button>
          <Button variant={'outline'}>Contact me</Button>
        </div>
      </div>
      <Profile />
    </section>
  )
}

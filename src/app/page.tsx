/* eslint-disable react/no-unescaped-entities */
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="h-full flex flex-col">
      <section className="h-[90vh] flex items-center max-w-screen-2xl w-full mx-auto px-4 md:px-8">
        <div className="">
          <div>
            <h1 className="text-3xl font-bold">
              Hey, I'm Filipe - FullStack Developer 👋
            </h1>
            <p className="text-sm text-pretty md:max-w-[50%] mt-6">
              I love diving deep into the world of technology and innovation.
              With solid experience in Javascript, Typescript, ReactJS, Next and
              Node.js, I am always ready to offer innovative, high-quality
              solutions that help companies achieve their business goals.
            </p>
          </div>
          <div className="flex gap-4 items-center mt-6">
            <Button>
              Get to know me <MoveRight className="ml-2" />
            </Button>
            <Button
              variant={'outline'}
              className="border-dashed border-foreground"
            >
              Contact me
            </Button>
          </div>
        </div>
      </section>
      <section className="min-h-screen">
        <h1>oioi</h1>
      </section>
    </main>
  )
}

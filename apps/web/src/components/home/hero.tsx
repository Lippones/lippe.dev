import { MoveRight } from 'lucide-react'

import { Button } from '../ui/button'

interface HeroProps {
  title: string
  description: string
  getToKnowMe: string
  contact: string
}

export function Hero({ contact, description, getToKnowMe, title }: HeroProps) {
  return (
    <section className="relative mx-auto flex h-[90vh] w-full max-w-screen-2xl items-center overflow-x-hidden px-4 md:px-8">
      <div className="">
        <div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="mt-6 text-pretty text-sm md:max-w-[50%]">
            {description}
          </p>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <Button>
            {getToKnowMe} <MoveRight className="ml-2" />
          </Button>
          <Button
            variant={'outline'}
            className="border-dashed border-foreground"
          >
            {contact}
          </Button>
        </div>
      </div>
    </section>
  )
}

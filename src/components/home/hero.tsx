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
    <section className="h-[90vh] flex items-center max-w-screen-2xl w-full mx-auto px-4 md:px-8 relative overflow-x-hidden">
      <div className="">
        <div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-sm text-pretty md:max-w-[50%] mt-6">
            {description}
          </p>
        </div>
        <div className="flex gap-4 items-center mt-6">
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

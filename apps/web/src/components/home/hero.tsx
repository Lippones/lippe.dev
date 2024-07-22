import iso3166 from 'iso-3166-2'
import { MoveRight } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'

import { Button } from '../ui/button'
import { HeroWorld } from './hero-world'

interface HeroProps {
  title: string
  description: string
  getToKnowMe: string
  contact: string
}

function getRegionByISO3166(code: string) {
  const region = iso3166.subdivision(code)
  if (region) {
    return {
      country: region.countryName,
      region: region.name,
    }
  } else {
    return {
      country: 'Brazil',
      region: 'Minas Gerais',
    }
  }
}

export function Hero({ contact, description, getToKnowMe, title }: HeroProps) {
  const header = headers()

  const region = getRegionByISO3166(
    header.get('x-vercel-ip-country') ?? 'BR-SP',
  )

  const address = {
    city: header.get('x-vercel-ip-city') ?? 'Governador Valadares',
    region: region.region,
    country: region.country,
    lat: Number(header.get('x-vercel-ip-latitude') ?? '-18.850651'),
    lng: Number(header.get('x-vercel-ip-longitude') ?? '-41.948792'),
    ip: header.get('x-real-ip') ?? '127.0.0.1',
  }

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
          <Button asChild>
            <Link href="/about">
              {getToKnowMe} <MoveRight className="ml-2" />
            </Link>
          </Button>
          <Button
            variant={'outline'}
            className="border-dashed border-foreground"
            asChild
          >
            <Link href="#footer">{contact}</Link>
          </Button>
        </div>
      </div>
      <HeroWorld address={address} />
    </section>
  )
}

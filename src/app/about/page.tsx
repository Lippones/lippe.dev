'use client'
import Image from 'next/image'
import BannerGif from '@/assets/sanji.gif'
import Me from '@/assets/profile.png'
import { ArrowDown, Dot } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { InfiniteText } from '@/components/infinite-text'
import dayjs from 'dayjs'

export default function About() {
  return (
    <div className="max-w-screen-2xl  w-full mx-auto px-4 md:px-8 pb-10">
      <div className="mt-12 grid grid-cols-2 items-center gap-12 gap-y-28">
        <div>
          <h1 className="text-4xl font-bold">
            Olá, fico feliz que veio saber mais sobre mim
          </h1>
          <span className="mt-6 text-muted-foreground flex">
            Esse sou eu <ArrowDown className="ml-2" />
          </span>
        </div>
        <Image
          src={BannerGif}
          alt="Banner image"
          className="rounded-2xl w-full"
        />
        <Image
          quality={100}
          className="rounded-2xl max-h-[500px] object-cover"
          src={Me}
          alt="Minha foto"
        />
        <p className="text-foreground/80 text-pretty">
          Olá, meu nome é Filipe Vieira da Silva, um entusiasta da tecnologia e
          inovação que transformou a paixão em profissão. Nasci e cresci em GV,
          onde a diversidade cultural e as oportunidades únicas moldaram minha
          visão de mundo e a maneira como abordo os desafios do desenvolvimento
          de software. Com 2 anos de experiência profunda no campo da
          tecnologia, me especializei como Full Stack Developer, habilidade que
          me permite ter uma visão holística de projetos digitais, desde a
          concepção até a implementação final. A versatilidade é uma das minhas
          marcas registradas – trabalho tanto para a empresa em que estou
          empregado quanto como freelancer, um equilíbrio que me desafia
          constantemente e me permite expandir meu repertório técnico. Meu
          interesse não se limita apenas ao trabalho formal; estou sempre à
          procura de criar e desenvolver novos micro SaaS (Software as a
          Service) e projetos independentes. Estes esforços paralelos não só
          aprimoram minhas habilidades, mas também me permitem explorar novas
          ideias e soluções inovadoras para os problemas do dia a dia. Eu
          acredito que a tecnologia tem o poder de transformar vidas e negócios,
          e é essa crença que me impulsiona a buscar a excelência em cada linha
          de código que escrevo. Estou ansioso para colaborar com equipes e
          projetos que compartilham dessa visão e estão em busca de um
          desenvolvedor que traz tanto conhecimento técnico quanto uma
          perspectiva criativa para a mesa. Se você está procurando alguém que
          possa unir a competência técnica com uma abordagem criativa para
          desenvolvimento de software, vamos conversar. Juntos, podemos
          transformar ideias em realidade digital.
        </p>
      </div>
      <div className="mt-20">
        <h2 className="text-4xl font-bold relative">
          Posso te ajudar em{' '}
          <InfiniteText
            texts={[
              'desenvolvimento de software',
              'desenvolvimento de software',
              'desenvolvimento de software',
            ]}
          />{' '}
        </h2>
        <ul className="mt-6 grid md:grid-cols-3 gap-8">
          <li className="flex flex-col gap-2 mt-4">
            <span className="text-sm text-muted-foreground">01.</span>
            <Separator />
            <h3 className="font-semibold">Desenvolvimento de software</h3>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              aliquam repellat dolore hic distinctio. Ea mollitia tenetur soluta
              iure enim ipsa veritatis sunt quam sint doloribus. Eveniet
              voluptatum delectus veniam?
            </p>
          </li>
          <li className="flex flex-col gap-2 mt-4">
            <span className="text-sm text-muted-foreground">02.</span>
            <Separator />
            <h3 className="font-semibold">Desenvolvimento de software</h3>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              aliquam repellat dolore hic distinctio. Ea mollitia tenetur soluta
              iure enim ipsa veritatis sunt quam sint doloribus. Eveniet
              voluptatum delectus veniam?
            </p>
          </li>
          <li className="flex flex-col gap-2 mt-4">
            <span className="text-sm text-muted-foreground">03.</span>
            <Separator />
            <h3 className="font-semibold">Desenvolvimento de software</h3>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              aliquam repellat dolore hic distinctio. Ea mollitia tenetur soluta
              iure enim ipsa veritatis sunt quam sint doloribus. Eveniet
              voluptatum delectus veniam?
            </p>
          </li>
        </ul>
      </div>
      <div className="mt-20 grid grid-cols-[300px_300px] gap-x-8 gap-y-12">
        <div>
          <h2 className="text-2xl font-bold">Areas of expertise</h2>
          <ul className="mt-6 flex flex-col gap-2">
            <li className="text-sm text-muted-foreground">
              Front-end development
            </li>
            <li className="text-sm text-muted-foreground">
              Back-end development
            </li>
            <li className="text-sm text-muted-foreground">Design</li>
            <li className="text-sm text-muted-foreground">DevOps</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Currently learning</h2>
          <ul className="mt-6 flex flex-col gap-2">
            <li className="text-sm text-muted-foreground">
              Front-end development
            </li>
            <li className="text-sm text-muted-foreground">
              Back-end development
            </li>
            <li className="text-sm text-muted-foreground">Design</li>
            <li className="text-sm text-muted-foreground">DevOps</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Personal interests</h2>
          <ul className="mt-6 flex flex-col gap-2">
            <li className="text-sm text-muted-foreground">
              Front-end development
            </li>
            <li className="text-sm text-muted-foreground">
              Back-end development
            </li>
            <li className="text-sm text-muted-foreground">Design</li>
            <li className="text-sm text-muted-foreground">DevOps</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Current projects</h2>
          <ul className="mt-6 flex flex-col gap-2">
            <li className="text-sm text-muted-foreground">
              Front-end development
            </li>
            <li className="text-sm text-muted-foreground">
              Back-end development
            </li>
            <li className="text-sm text-muted-foreground">Design</li>
            <li className="text-sm text-muted-foreground">DevOps</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Carreira</h2>
          <ul className="mt-6 flex flex-col gap-2">
            <li>
              <ExperienceCard
                company="Bttis"
                role="Desenvolvedor Full Stack"
                startDate={new Date()}
                endDate={new Date()}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

interface ExperienceCardProps {
  company: string
  role: string
  startDate: Date
  endDate?: Date
}

export function ExperienceCard({
  company,
  role,
  startDate,
  endDate,
}: ExperienceCardProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{role}</h3>
      <div className="flex  text-muted-foreground items-center">
        <p className="text-sm">Empresa {company}</p>
        <Dot className="h-8 w-8" />
        <p className="text-sm">
          {dayjs(startDate).get('year')} -{' '}
          {endDate ? dayjs(endDate).get('year') : 'Atual'}
        </p>
      </div>
    </div>
  )
}

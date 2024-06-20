import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

import { Button } from '../ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Separator } from '../ui/separator'
import { AvatarProfile } from './avatar-profile'

export function Profile() {
  return (
    <div className="absolute bottom-12 left-0">
      <HoverCard openDelay={200} closeDelay={200}>
        <HoverCardTrigger className="rounded-full">
          <AvatarProfile
            avatarUrl="https://github.com/lippones.png"
            status="away"
          />
        </HoverCardTrigger>
        <HoverCardContent className="flex w-80 flex-col gap-4">
          <div>
            <h2 className="text-lg font-bold">Filipe Vieira</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              FullStack Developer
            </p>
          </div>
          <Separator />
          <div>
            <span className="text-sm font-bold">Bio</span>
            <p className="mt-2 text-xs text-muted-foreground">
              I love diving deep into the world of technology and innovation.
              With solid experience in Javascript, Typescript, ReactJS, Next and
              Node.js, I am always ready to offer innovative, high-quality
              solutions that help companies achieve their business goals.
            </p>
          </div>
          <Separator />
          <div>
            <span className="text-sm font-bold">Redes</span>
            <ul className="mt-2 grid grid-cols-2 gap-2">
              <li>
                <Button variant={'outline'} className="w-full">
                  Twitter <FaTwitter className="ml-2" />
                </Button>
              </li>
              <li>
                <Button variant={'outline'} className="w-full">
                  Instagram <FaInstagram className="ml-2" />
                </Button>
              </li>
              <li>
                <Button variant={'outline'} className="w-full">
                  LinkedIn <FaLinkedin className="ml-2" />
                </Button>
              </li>
              <li>
                <Button variant={'outline'} className="w-full">
                  LinkedIn <FaGithub className="ml-2" />
                </Button>
              </li>
            </ul>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

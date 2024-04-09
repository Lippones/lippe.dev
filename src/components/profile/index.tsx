import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { AvatarProfile } from './avatar-profile'

export function Profile() {
  return (
    <div className="absolute left-0 bottom-12">
      <HoverCard openDelay={200} closeDelay={200}>
        <HoverCardTrigger className="rounded-full">
          <AvatarProfile
            avatarUrl="https://github.com/lippones.png"
            status="away"
          />
        </HoverCardTrigger>
        <HoverCardContent className="w-80 flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-bold">Filipe Vieira</h2>
            <p className="text-xs text-muted-foreground mt-2">
              FullStack Developer
            </p>
          </div>
          <Separator />
          <div>
            <span className="text-sm font-bold">Bio</span>
            <p className="text-xs text-muted-foreground mt-2">
              I love diving deep into the world of technology and innovation.
              With solid experience in Javascript, Typescript, ReactJS, Next and
              Node.js, I am always ready to offer innovative, high-quality
              solutions that help companies achieve their business goals.
            </p>
          </div>
          <Separator />
          <div>
            <span className="text-sm font-bold">Redes</span>
            <ul className="grid grid-cols-2 gap-2 mt-2">
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

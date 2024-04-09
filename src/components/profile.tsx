'use client'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Moon } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import { useEffect } from 'react'
import { env } from '@/env'

export function Profile() {
  useEffect(() => {
    const sdk = SpotifyApi.withClientCredentials(
      env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      env.NEXT_PUBLIC_SPOTIFY_SECRET,
    )
    sdk.getAccessToken().then((token) => {
      console.log(token)
    })
  }, [])

  return (
    <div className="absolute left-0 bottom-12">
      <HoverCard openDelay={200} closeDelay={200}>
        <HoverCardTrigger className="rounded-full">
          <AvatarProfile avatarUrl="/profile.png" status="away" />
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

interface AvatarProfileProps {
  avatarUrl: string
  status: 'online' | 'offline' | 'away'
}

export function AvatarProfile({ avatarUrl, status }: AvatarProfileProps) {
  return (
    <div className="relative max-w-fit">
      <Avatar className="w-20 h-20">
        <AvatarImage src={avatarUrl} width={40} height={40} alt="Filipe" />
        <AvatarFallback>FV</AvatarFallback>
      </Avatar>
      <ProfileStatus status={status} />
    </div>
  )
}

interface ProfileStatusProps {
  status: 'online' | 'offline' | 'away'
}

export function ProfileStatus({ status }: ProfileStatusProps) {
  return (
    <div aria-label="status">
      <span className="absolute -bottom-1 -right-1 p-1.5 rounded-full flex justify-center items-center bg-secondary">
        {status === 'online' && (
          <span className="bg-green-500 block w-4 h-4 rounded-full" />
        )}
        {status === 'offline' && (
          <span className="bg-gray-500 block w-4 h-4 rounded-full" />
        )}
        {status === 'away' && (
          <Moon className="w-4 h-4 fill-yellow-500 text-yellow-500" />
        )}
        <span className="sr-only">{status}</span>
      </span>
    </div>
  )
}

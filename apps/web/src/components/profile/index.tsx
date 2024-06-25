'use client'
import { useEffect, useRef, useState } from 'react'
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import useSWR from 'swr'

import { SpotifyCurrentTrackResponse } from '@/services/spotify/types'

import { Button } from '../ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Separator } from '../ui/separator'
import { AvatarProfile } from './avatar-profile'

export function Profile() {
  const [currentTime, setCurrentTime] = useState<number | null>(null)
  const fetcher = (url: string) => fetch(url).then((r) => r.json())

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const { data, mutate } = useSWR<SpotifyCurrentTrackResponse>('/api/spotify', {
    refreshInterval: 1000 * 5, // 5 seconds
    loadingTimeout: 0,
    fetcher,
  })

  function handlePlayPreview() {
    const audio = audioRef.current

    if (!audio) return

    if (audio.paused) {
      audio.play()
      audio.volume = 0.1
    } else {
      audio.pause()
    }
  }

  useEffect(() => {
    if (data) {
      const progressMs = data.progress_ms
      setCurrentTime(progressMs)

      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev !== null) {
            if (prev >= data.item.duration_ms) {
              mutate() // Invalida a query quando a música termina
              return data.item.duration_ms
            }
            return prev + 1000
          }
          return null
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [data, mutate])

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div
      onMouseEnter={handlePlayPreview}
      onMouseLeave={handlePlayPreview}
      className="absolute bottom-12 left-0"
    >
      <div className="relative">
        {data && data.is_playing && (
          <div>
            <audio ref={audioRef} src={data.item.preview_url} />
            <span>{data.item.artists[0].name}</span>
            <span>{currentTime ? formatTime(currentTime) : null}</span>
          </div>
        )}
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
                With solid experience in Javascript, Typescript, ReactJS, Next
                and Node.js, I am always ready to offer innovative, high-quality
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
    </div>
  )
}

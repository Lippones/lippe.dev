'use client'

import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

import { SpotifyCurrentTrackResponse } from '@/services/spotify/types'

import { Badge } from '../ui/badge'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Separator } from '../ui/separator'
import { AvatarProfile } from './avatar-profile'
import { BadgeSpotify } from './badge-spotify'
import { SpotifyCard } from './spotify-card'

export const dynamic = 'force-dynamic'

export function Profile() {
  const [open, setOpen] = useState(true)
  const [currentTime, setCurrentTime] = useState<number | null>(null)
  const [percentageCompleted, setPercentageCompleted] = useState<number | null>(
    null,
  )
  const fetcher = (url: string) =>
    fetch(url, {
      cache: 'no-cache',
    }).then((r) => r.json())

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
            if (prev >= data?.item?.duration_ms) {
              mutate() // Invalida a query quando a música termina
              return data?.item?.duration_ms
            }
            return prev + 1000
          }
          return null
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [data, mutate])

  useEffect(() => {
    if (currentTime !== null && data) {
      const durationMs = data.item.duration_ms
      const percentage = (currentTime / durationMs) * 100
      setPercentageCompleted(percentage)
    }
  }, [currentTime, data])

  return (
    <div
      onMouseEnter={handlePlayPreview}
      onMouseLeave={handlePlayPreview}
      className="absolute bottom-12 left-0"
    >
      <div className="relative">
        {data && data.is_playing && (
          <>
            <audio ref={audioRef} src={data.item.preview_url} />
            <Badge
              variant={'secondary'}
              className="absolute -bottom-10 z-10 inline-flex max-w-[160px] cursor-pointer flex-nowrap overflow-hidden rounded-full border border-zinc-600 p-2"
            >
              <BadgeSpotify currentTime={currentTime} data={data} />
              <BadgeSpotify
                currentTime={currentTime}
                data={data}
                aria-hidden="true"
              />
            </Badge>
          </>
        )}
        <HoverCard
          openDelay={200}
          closeDelay={200}
          open={open}
          onOpenChange={setOpen}
        >
          <HoverCardTrigger className="rounded-full">
            <AvatarProfile
              avatarUrl="https://github.com/lippones.png"
              status="away"
              onClick={() => setOpen(!open)}
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
            {data && data.is_playing && (
              <SpotifyCard
                currentTime={currentTime}
                data={data}
                percentageCompleted={percentageCompleted}
              />
            )}
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  )
}

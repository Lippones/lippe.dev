'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { currentTrackStore } from '@/context/current-track'

import { Badge } from '../ui/badge'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Separator } from '../ui/separator'
import { AvatarProfile } from './avatar-profile'
import { BadgeSpotify } from './badge-spotify'
import { SpotifyCard } from './spotify-card'

export const dynamic = 'force-dynamic'

export function Profile() {
  const { currentTrack, startConnection } = currentTrackStore((state) => ({
    startConnection: state.startConnection,
    currentTrack: state.currentTrack,
  }))

  useEffect(() => {
    startConnection()
  }, [])

  const [open, setOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState<number | null>(null)
  const [percentageCompleted, setPercentageCompleted] = useState<number | null>(
    null,
  )

  const audioRef = useRef<HTMLAudioElement | null>(null)

  function handlePlayPreview(play: boolean) {
    const audio = audioRef.current

    if (!audio) return

    if (play) {
      audio.play()
      audio.volume = 0.1
    } else {
      audio.pause()
    }
  }

  useEffect(() => {
    if (currentTrack) {
      const progressMs = currentTrack.progress_ms
      setCurrentTime(progressMs)

      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev !== null) {
            return prev + 1000
          }
          return null
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [currentTrack])

  useEffect(() => {
    if (currentTime !== null && currentTrack && currentTrack.is_playing) {
      const durationMs = currentTrack.item.duration_ms
      const percentage = (currentTime / durationMs) * 100
      setPercentageCompleted(percentage)
    }
  }, [currentTime, currentTrack])

  const profileStatus = currentTrack
    ? currentTrack.is_playing
      ? 'online'
      : 'away'
    : 'offline'

  return (
    <div className="sticky bottom-4 left-0 mx-auto w-full max-w-screen-2xl px-4 pb-10 md:px-8">
      <div className="relative max-w-fit">
        {currentTrack && currentTrack.is_playing && (
          <>
            <audio ref={audioRef} src={currentTrack.item.preview_url} />
            <Link
              href={currentTrack.item.external_urls.spotify}
              target="_blank"
            >
              <Badge
                variant={'secondary'}
                className="absolute -bottom-10 z-10 inline-flex max-w-[160px] cursor-pointer flex-nowrap overflow-hidden rounded-full border border-zinc-600 p-2"
              >
                <BadgeSpotify currentTime={currentTime} data={currentTrack} />
                <BadgeSpotify
                  currentTime={currentTime}
                  data={currentTrack}
                  aria-hidden="true"
                />
              </Badge>
            </Link>
          </>
        )}
        <HoverCard
          openDelay={200}
          closeDelay={200}
          open={open}
          onOpenChange={(value) => {
            setOpen(value)
            handlePlayPreview(value)
          }}
        >
          <HoverCardTrigger className="rounded-full">
            <AvatarProfile
              avatarUrl="https://github.com/lippones.png"
              status={profileStatus}
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
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⣀⡴⢧⣀⠀⠀⣀⣠⠤⠤⠤⠤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠘⠏⢀⡴⠊⠁⠀⠀⠀⠀⠀⠀⠈⠙⠦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⣰⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢶⣶⣒⣶⠦⣤⣀⠀⠀
                ⠀⠀⠀⠀⠀⠀⢀⣰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣟⠲⡌⠙⢦⠈⢧⠀
                ⠀⠀⠀⣠⢴⡾⢟⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡴⢃⡠⠋⣠⠋⠀
                ⠐⠀⠞⣱⠋⢰⠁⢿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⠤⢖⣋⡥⢖⣫⠔⠋⠀⠀⠀
                ⠈⠠⡀⠹⢤⣈⣙⠚⠶⠤⠤⠤⠴⠶⣒⣒⣚⣩⠭⢵⣒⣻⠭⢖⠏⠁⢀⣀⠀⠀⠀⠀
                ⠠⠀⠈⠓⠒⠦⠭⠭⠭⣭⠭⠭⠭⠭⠿⠓⠒⠛⠉⠉⠀⠀⣠⠏⠀⠀⠘⠞⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠓⢤⣀⠀⠀⠀⠀⠀⠀⣀⡤⠞⠁⠀⣰⣆⠀⠀⠀⠀⠀⠀
                ⠀⠀⠀⠀⠀⠘⠿⠀⠀⠀⠀⠀⠈⠉⠙⠒⠒⠛⠉⠁⠀⠀⠀⠉⢳⡞⠉⠀⠀⠀⠀⠁
              </p>
            </div>
            <Separator />
            {currentTrack && currentTrack.is_playing && (
              <SpotifyCard
                currentTime={currentTime}
                data={currentTrack}
                percentageCompleted={percentageCompleted}
              />
            )}
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  )
}

import { ComponentProps } from 'react'
import { FaSpotify } from 'react-icons/fa'

import { SpotifyCurrentTrackResponse } from '@/services/spotify/types'
import { formatMilliseconds } from '@/utils/format-milliseconds'

interface BadgeSpotifyProps extends ComponentProps<'div'> {
  data: SpotifyCurrentTrackResponse
  currentTime: number | null
}

export function BadgeSpotify({ currentTime, data }: BadgeSpotifyProps) {
  const artistsNames =
    data?.item.artists.map((artist) => artist.name).join(', ') || ''

  return (
    <div
      className={`flex animate-infinite-scroll items-center gap-2 text-nowrap px-4`}
    >
      <FaSpotify />
      <span>{artistsNames}</span>
      <span>-</span>
      <span>{data.item.name}</span>
      <span>{currentTime ? formatMilliseconds(currentTime) : null}</span>
    </div>
  )
}

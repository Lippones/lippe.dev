import Image from 'next/image'

import { SpotifyCurrentTrackResponse } from '@/@types/spotify-response'
import { formatMilliseconds } from '@/utils/format-milliseconds'

import { Progress } from '../ui/progress'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

interface SpotifyCardProps {
  data: SpotifyCurrentTrackResponse
  currentTime: number | null
  percentageCompleted: number | null
}

export function SpotifyCard({
  currentTime,
  data,
  percentageCompleted,
}: SpotifyCardProps) {
  const artistsNames =
    data?.item.artists.map((artist) => artist.name).join(', ') || ''

  return (
    <div>
      <p className="text-xs text-muted-foreground">Ouvido Spotify</p>
      <div className="mt-2 flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Image
                width={100}
                height={100}
                className="rounded-sm"
                src={data.item.album.images[0].url}
                alt={data.item.name}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{data.item.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex flex-1 flex-col gap-1">
          <h3 className="text-sm font-semibold">{data.item.name}</h3>
          <p className="text-[10px] text-muted-foreground">{artistsNames}</p>
          <p className="text-[10px] text-muted-foreground">
            Do album {data.item.album.name}
          </p>
          <div className="mt-auto w-full">
            <Progress className="h-1" value={percentageCompleted} />
            <div className="mt-1 flex justify-between">
              <span className="text-[10px] text-muted-foreground">
                {formatMilliseconds(currentTime || 0)}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {formatMilliseconds(data.item.duration_ms)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

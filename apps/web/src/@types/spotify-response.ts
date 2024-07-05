/* eslint-disable no-use-before-define */
export type SpotifyCurrentTrackResponse = {
  actions: Actions
  context: Context
  currently_playing_type: string
  is_playing: boolean
  item: Item
  progress_ms: number
  timestamp: number
}

export type Actions = {
  disallows: Disallows
}

export type Disallows = {
  resuming: boolean
}

export type Context = {
  external_urls: ExternalUrls
  href: string
  type: string
  uri: string
}

export type ExternalUrls = {
  spotify: string
}

export type Item = {
  album: Album
  artists: Artist2[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: ExternalIds
  external_urls: ExternalUrls5
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
}

export type Album = {
  album_type: string
  artists: Artist[]
  available_markets: string[]
  external_urls: ExternalUrls3
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

export type Artist = {
  external_urls: ExternalUrls2
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export type ExternalUrls2 = {
  spotify: string
}

export type ExternalUrls3 = {
  spotify: string
}

export type Image = {
  height: number
  url: string
  width: number
}

export type Artist2 = {
  external_urls: ExternalUrls4
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export type ExternalUrls4 = {
  spotify: string
}

export type ExternalIds = {
  isrc: string
}

export type ExternalUrls5 = {
  spotify: string
}

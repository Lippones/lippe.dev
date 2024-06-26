/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
import { getTranslations } from 'next-intl/server'

export const runtime = 'edge'

export const alt = 'Filipe Vieira da Silva'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  const [t, avatarUrl, bannerUrl] = await Promise.all([
    getTranslations('config.metadata'),

    fetch(new URL('../../assets/profile.png', import.meta.url)).then((res) =>
      res.arrayBuffer(),
    ),

    fetch(new URL('../../assets/banner.jpg', import.meta.url)).then((res) =>
      res.arrayBuffer(),
    ),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#09090B',
          color: '#FFFFFF',
          position: 'relative',
        }}
      >
        <img
          src={bannerUrl as unknown as string}
          alt="banner image"
          style={{
            display: 'flex',
            backgroundColor: '#27272A',
            flex: 1,
            objectFit: 'cover',
            width: size.width,
            opacity: 0.9,
          }}
        />
        <div
          style={{
            display: 'flex',
            gap: 24,
            padding: 64,
            width: size.width,
          }}
        >
          <img
            src={avatarUrl as unknown as string}
            alt="avatar image"
            style={{ width: 120, height: 120, borderRadius: 8 }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <h1
              style={{
                fontSize: 32,
                margin: 0,
                padding: 0,
                fontWeight: 700,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: size.width - 120 - 64 * 2,
              }}
            >
              {t('title')}
            </h1>
            <p
              style={{
                fontSize: 16,
                margin: 0,
                padding: 0,
                color: '#A0A0A0',
                width: size.width - 120 - 64 * 2,
              }}
            >
              {t('description')}
            </p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}

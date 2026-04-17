export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || '6sa6k1dz0g',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Mediavoxer',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Independent media updates',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A simple newsroom-style publication for announcements, coverage, and media updates on Mediavoxer.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'mediavoxer.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mediavoxer.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

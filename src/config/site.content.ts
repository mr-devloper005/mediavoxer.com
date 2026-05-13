import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Media Release Distribution',
  },
  footer: {
    tagline: 'Professional Release Media publishing',
  },
  hero: {
    badge: 'Release Media',
    title: ['Distribute your news to the world.', 'Professional media distribution platform.'],
    description:
      'A comprehensive Release Media distribution platform for businesses, organizations, and media professionals to share their news with global audiences.',
    primaryCta: {
      label: 'Browse Release Media',
      href: '/articles',
    },
    secondaryCta: {
      label: 'Submit Release Media',
      href: '/create/article',
    },
    searchPlaceholder: 'Search Release Media',
    focusLabel: 'Latest',
    featureCardBadge: 'featured',
    featureCardTitle: 'Latest Release Media from leading organizations.',
    featureCardDescription:
      'Stay updated with the latest news and announcements from companies, nonprofits, and media organizations worldwide.',
  },
  home: {
    metadata: {
      title: 'Latest Release Media & Media Updates',
      description:
        'Discover the latest Release Media, company announcements, and media updates from organizations worldwide through our professional distribution platform.',
      openGraphTitle: 'Latest Release Media & Media Updates',
      openGraphDescription:
        'Professional Release Media distribution platform for businesses, organizations, and media professionals to share their news globally.',
      keywords: ['Release Media', 'media distribution', 'company announcements', 'news updates', 'public relations'],
    },
    introBadge: 'About',
    introTitle: 'Professional Release Media distribution platform.',
    introParagraphs: [
      'Mediavoxer is designed for organizations that need to distribute Release Media and media announcements to global audiences efficiently.',
      'Release Media are published immediately, archives remain searchable, and the reading experience prioritizes clarity and professionalism.',
      'The platform is built for media professionals, journalists, and organizations who need reliable news distribution.',
    ],
    sideBadge: 'Platform features',
    sidePoints: [
      'Latest Release Media featured on homepage.',
      'Advanced search and filtering by category and date.',
      'Professional reading experience optimized for media.',
      'Global distribution network for maximum reach.',
    ],
    primaryLink: {
      label: 'Browse Release Media',
      href: '/articles',
    },
    secondaryLink: {
      label: 'Submit Release',
      href: '/create/article',
    },
  },
  cta: {
    badge: 'Distribution Services',
    title: 'Professional Release Media distribution for maximum impact.',
    description:
      'Reach journalists, media outlets, and global audiences with our comprehensive Release Media distribution platform designed for modern media professionals.',
    primaryCta: {
      label: 'Submit Release Media',
      href: '/create/article',
    },
    secondaryCta: {
      label: 'View Archive',
      href: '/articles',
    },
  },
  taskSectionHeading: 'Latest Release Media',
  taskSectionDescriptionSuffix: 'Discover the newest media updates and announcements.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Release Media',
    description: 'Read the latest Release Media and media announcements.',
  },
  listing: {
    title: 'Media Directory',
    description: 'Explore media contacts and organization listings.',
  },
  classified: {
    title: 'Media Opportunities',
    description: 'Browse media opportunities and partnership notices.',
  },
  image: {
    title: 'Media Gallery',
    description: 'Browse media images and visual press content.',
  },
  profile: {
    title: 'Media Profiles',
    description: 'View media professional profiles and organization pages.',
  },
  sbm: {
    title: 'Media Resources',
    description: 'Browse curated media resources and industry links.',
  },
  pdf: {
    title: 'Media Kits',
    description: 'Download media kits and press materials.',
  },
  mediaDistribution: {
    title: 'Release Media',
    description: 'Read the latest Release Media and media announcements.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Media Directory', paragraphs: ['Media contacts, organizations, and service listings for press professionals.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Release Media', paragraphs: ['Official Release Media and media announcements from organizations worldwide.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Media Opportunities', paragraphs: ['Media opportunities, partnerships, and collaboration notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Media Gallery', paragraphs: ['Visual media content, press photos, and image galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Media Profiles', paragraphs: ['Professional media profiles and organization contact information.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Media Resources', paragraphs: ['Curated media resources, industry links, and reference materials.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Media Kits', paragraphs: ['Downloadable media kits, press materials, and official documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Media Updates', paragraphs: ['Quick media updates and social announcements.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Media Commentary', paragraphs: ['Industry commentary and expert responses.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Media Organizations', paragraphs: ['Media organization profiles and contact directories.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Release Media',
    paragraphs: [
      'This archive is designed for professional media distribution: Release Media, announcements, and official communications presented in a clean, journalist-friendly format.',
      'The layout prioritizes readability and quick scanning so media professionals can find relevant stories efficiently and access contact information easily.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Submit Release', href: '/create/article' },
    ],
  },
}

import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Media Press Release Distribution',
  },
  footer: {
    tagline: 'Professional press release publishing',
  },
  hero: {
    badge: 'Press Releases',
    title: ['Distribute your news to the world.', 'Professional media distribution platform.'],
    description:
      'A comprehensive press release distribution platform for businesses, organizations, and media professionals to share their news with global audiences.',
    primaryCta: {
      label: 'Browse Press Releases',
      href: '/articles',
    },
    secondaryCta: {
      label: 'Submit Press Release',
      href: '/create/article',
    },
    searchPlaceholder: 'Search press releases',
    focusLabel: 'Latest',
    featureCardBadge: 'featured',
    featureCardTitle: 'Latest press releases from leading organizations.',
    featureCardDescription:
      'Stay updated with the latest news and announcements from companies, nonprofits, and media organizations worldwide.',
  },
  home: {
    metadata: {
      title: 'Latest Press Releases & Media Updates',
      description:
        'Discover the latest press releases, company announcements, and media updates from organizations worldwide through our professional distribution platform.',
      openGraphTitle: 'Latest Press Releases & Media Updates',
      openGraphDescription:
        'Professional press release distribution platform for businesses, organizations, and media professionals to share their news globally.',
      keywords: ['press releases', 'media distribution', 'company announcements', 'news updates', 'public relations'],
    },
    introBadge: 'About',
    introTitle: 'Professional press release distribution platform.',
    introParagraphs: [
      'Mediavoxer is designed for organizations that need to distribute press releases and media announcements to global audiences efficiently.',
      'Press releases are published immediately, archives remain searchable, and the reading experience prioritizes clarity and professionalism.',
      'The platform is built for media professionals, journalists, and organizations who need reliable news distribution.',
    ],
    sideBadge: 'Platform features',
    sidePoints: [
      'Latest press releases featured on homepage.',
      'Advanced search and filtering by category and date.',
      'Professional reading experience optimized for media.',
      'Global distribution network for maximum reach.',
    ],
    primaryLink: {
      label: 'Browse Press Releases',
      href: '/articles',
    },
    secondaryLink: {
      label: 'Submit Release',
      href: '/create/article',
    },
  },
  cta: {
    badge: 'Distribution Services',
    title: 'Professional press release distribution for maximum impact.',
    description:
      'Reach journalists, media outlets, and global audiences with our comprehensive press release distribution platform designed for modern media professionals.',
    primaryCta: {
      label: 'Submit Press Release',
      href: '/create/article',
    },
    secondaryCta: {
      label: 'View Archive',
      href: '/articles',
    },
  },
  taskSectionHeading: 'Latest Press Releases',
  taskSectionDescriptionSuffix: 'Discover the newest media updates and announcements.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Press Releases',
    description: 'Read the latest press releases and media announcements.',
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
    title: 'Press Releases',
    description: 'Read the latest press releases and media announcements.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Media Directory', paragraphs: ['Media contacts, organizations, and service listings for press professionals.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Press Releases', paragraphs: ['Official press releases and media announcements from organizations worldwide.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Media Opportunities', paragraphs: ['Media opportunities, partnerships, and collaboration notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Media Gallery', paragraphs: ['Visual media content, press photos, and image galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Media Profiles', paragraphs: ['Professional media profiles and organization contact information.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Media Resources', paragraphs: ['Curated media resources, industry links, and reference materials.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Media Kits', paragraphs: ['Downloadable media kits, press materials, and official documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Media Updates', paragraphs: ['Quick media updates and social announcements.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Media Commentary', paragraphs: ['Industry commentary and expert responses.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Media Organizations', paragraphs: ['Media organization profiles and contact directories.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Press Releases',
    paragraphs: [
      'This archive is designed for professional media distribution: press releases, announcements, and official communications presented in a clean, journalist-friendly format.',
      'The layout prioritizes readability and quick scanning so media professionals can find relevant stories efficiently and access contact information easily.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Submit Release', href: '/create/article' },
    ],
  },
}

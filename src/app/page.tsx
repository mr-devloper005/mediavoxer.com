import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bookmark, Building2, Compass, FileText, Globe2, Image as ImageIcon, LayoutGrid, MapPin, ShieldCheck, Tag, TrendingUp, User } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind, type ProductKind } from '@/design/factory/get-product-kind'
import type { SitePost } from '@/lib/site-connector'
import { getHomeEditorialMockPosts, mergeEditorialPostsForHome } from '@/lib/home-editorial-mock'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

type EnabledTask = (typeof SITE_CONFIG.tasks)[number]
type TaskFeedItem = { task: EnabledTask; posts: SitePost[] }

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: Bookmark,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
  mediaDistribution: FileText,
}

function resolveTaskKey(value: unknown, fallback: TaskKey): TaskKey {
  if (
    value === 'listing' ||
    value === 'classified' ||
    value === 'article' ||
    value === 'image' ||
    value === 'profile' ||
    value === 'sbm' ||
    value === 'mediaDistribution'
  )
    return value
  return fallback
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
    ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  const logo = typeof post?.content === 'object' && post?.content && typeof (post.content as any).logo === 'string'
    ? (post.content as any).logo
    : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getPostMeta(post?: SitePost | null) {
  if (!post || typeof post.content !== 'object' || !post.content) return { location: '', category: '' }
  const content = post.content as Record<string, unknown>
  return {
    location: typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : '',
    category: typeof content.category === 'string' ? content.category : typeof post.tags?.[0] === 'string' ? post.tags[0] : '',
  }
}

function getDirectoryTone(brandPack: string) {
  if (brandPack === 'market-utility') {
    return {
      shell: 'bg-[#FFFBF8] text-[#852747]',
      hero: 'bg-[linear-gradient(180deg,#FFFBF8_0%,#F5C6A5/20_100%)]',
      panel: 'border border-[#A2416B]/20 bg-white shadow-[0_24px_64px_rgba(162,65,107,0.08)]',
      soft: 'border border-[#A2416B]/15 bg-[#FFFBF8]',
      muted: 'text-[#852747]/80',
      title: 'text-[#852747]',
      badge: 'bg-[#A2416B] text-white',
      action: 'bg-[#A2416B] text-white hover:bg-[#852747]',
      actionAlt: 'border border-[#A2416B]/20 bg-white text-[#852747] hover:bg-[#F5C6A5]/30',
    }
  }
  return {
    shell: 'bg-[#FFFBF8] text-[#852747]',
    hero: 'bg-[linear-gradient(180deg,#FFFBF8_0%,#F5C6A5/15_100%)]',
    panel: 'border border-[#A2416B]/20 bg-white shadow-[0_24px_64px_rgba(162,65,107,0.08)]',
    soft: 'border border-[#A2416B]/15 bg-[#FFFBF8]',
    muted: 'text-[#852747]/80',
    title: 'text-[#852747]',
    badge: 'bg-[#A2416B] text-white',
    action: 'bg-[#A2416B] text-white hover:bg-[#852747]',
    actionAlt: 'border border-[#A2416B]/20 bg-white text-[#852747] hover:bg-[#F5C6A5]/30',
  }
}

function getEditorialTone() {
  return {
    shell: 'bg-[#FFFBF8] text-[#852747]',
    panel: 'border border-[#A2416B]/20 bg-white shadow-[0_24px_60px_rgba(162,65,107,0.08)]',
    soft: 'border border-[#A2416B]/15 bg-[#FFFBF8]',
    muted: 'text-[#852747]/80',
    title: 'text-[#852747]',
    badge: 'bg-[#A2416B] text-white',
    action: 'bg-[#A2416B] text-white hover:bg-[#852747]',
    actionAlt: 'border border-[#A2416B]/20 bg-transparent text-[#852747] hover:bg-[#F5C6A5]/30',
  }
}

function getVisualTone() {
  return {
    shell: 'bg-[#07101f] text-white',
    panel: 'border border-white/10 bg-[rgba(11,18,31,0.78)] shadow-[0_28px_80px_rgba(0,0,0,0.35)]',
    soft: 'border border-white/10 bg-white/6',
    muted: 'text-slate-300',
    title: 'text-white',
    badge: 'bg-[#8df0c8] text-[#07111f]',
    action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    actionAlt: 'border border-white/10 bg-white/6 text-white hover:bg-white/10',
  }
}

function getCurationTone() {
  return {
    shell: 'bg-[#FFFBF8] text-[#852747]',
    panel: 'border border-[#A2416B]/20 bg-white shadow-[0_24px_60px_rgba(162,65,107,0.08)]',
    soft: 'border border-[#A2416B]/15 bg-[#FFFBF8]',
    muted: 'text-[#852747]/80',
    title: 'text-[#852747]',
    badge: 'bg-[#A2416B] text-white',
    action: 'bg-[#A2416B] text-white hover:bg-[#852747]',
    actionAlt: 'border border-[#A2416B]/20 bg-transparent text-[#852747] hover:bg-[#F5C6A5]/30',
  }
}

function DirectoryHome({ primaryTask, enabledTasks, listingPosts, classifiedPosts, profilePosts, brandPack }: {
  primaryTask?: EnabledTask
  enabledTasks: EnabledTask[]
  listingPosts: SitePost[]
  classifiedPosts: SitePost[]
  profilePosts: SitePost[]
  brandPack: string
}) {
  const tone = getDirectoryTone(brandPack)
  const featuredListings = (listingPosts.length ? listingPosts : classifiedPosts).slice(0, 3)
  const featuredTaskKey: TaskKey = listingPosts.length ? 'listing' : 'classified'
  const quickRoutes = enabledTasks.slice(0, 4)

  return (
    <main>
      <section className={tone.hero}>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
                <Compass className="h-3.5 w-3.5" />
                Local discovery product
              </span>
              <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
                Search businesses, compare options, and act fast without digging through generic feeds.
              </h1>
              <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>

              <div className={`mt-8 grid gap-3 rounded-[2rem] p-4 ${tone.panel} md:grid-cols-[1.25fr_0.8fr_auto]`}>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">What do you need today?</div>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">Choose area or city</div>
                <Link href={primaryTask?.route || '/listings'} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                  Browse now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ['Verified businesses', `${featuredListings.length || 3}+ highlighted surfaces`],
                  ['Fast scan rhythm', 'More utility, less filler'],
                  ['Action first', 'Call, visit, shortlist, compare'],
                ].map(([label, value]) => (
                  <div key={label} className={`rounded-[1.4rem] p-4 ${tone.soft}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">{label}</p>
                    <p className="mt-2 text-lg font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className={`rounded-[2rem] p-6 ${tone.panel}`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">Primary lane</p>
                    <h2 className="mt-2 text-3xl font-semibold">{primaryTask?.label || 'Listings'}</h2>
                  </div>
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className={`mt-4 text-sm leading-7 ${tone.muted}`}>{primaryTask?.description || 'Structured discovery for services, offers, and business surfaces.'}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {quickRoutes.map((task) => {
                  const Icon = taskIcons[task.key as TaskKey] || LayoutGrid
                  return (
                    <Link key={task.key} href={task.route} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                      <Icon className="h-5 w-5" />
                      <h3 className="mt-4 text-lg font-semibold">{task.label}</h3>
                      <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{task.description}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Featured businesses</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Strong listings with clearer trust cues.</h2>
          </div>
          <Link href="/listings" className="text-sm font-semibold text-primary hover:opacity-80">Open listings</Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredListings.map((post) => (
            <TaskPostCard key={post.id} post={post} href={getTaskHref(featuredTaskKey, post.slug)} taskKey={featuredTaskKey} />
          ))}
        </div>
      </section>

      <section className={`${tone.shell}`}>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">What makes this different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Built like a business directory, not a recolored content site.</h2>
            <ul className={`mt-6 space-y-3 text-sm leading-7 ${tone.muted}`}>
              <li>Search-first hero instead of a magazine headline.</li>
              <li>Action-oriented listing cards with trust metadata.</li>
              <li>Support lanes for offers, businesses, and profiles.</li>
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(profilePosts.length ? profilePosts : classifiedPosts).slice(0, 4).map((post) => {
              const meta = getPostMeta(post)
              const taskKey = resolveTaskKey(post.task, profilePosts.length ? 'profile' : 'classified')
              return (
                <Link key={post.id} href={getTaskHref(taskKey, post.slug)} className={`overflow-hidden rounded-[1.8rem] ${tone.panel}`}>
                  <div className="relative h-44 overflow-hidden">
                    <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-70">{meta.category || post.task || 'Profile'}</p>
                    <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                    <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Quick access to local information and related surfaces.'}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

function splitIntoTwoParagraphs(text: string) {
  const t = text.trim()
  if (!t) return ['', '']
  const splitAt = t.search(/\.\s+[A-Z]/)
  if (splitAt > 80) {
    return [t.slice(0, splitAt + 1).trim(), t.slice(splitAt + 1).trim()]
  }
  const half = Math.floor(t.length / 2)
  const space = t.lastIndexOf(' ', half + 40)
  if (space > 40) return [t.slice(0, space).trim(), t.slice(space).trim()]
  return [t, '']
}

function getPostCategoryLabel(post: SitePost): string {
  const content =
    post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const cat = content.category
  if (typeof cat === 'string' && cat.trim()) return cat.trim()
  const tag = post.tags?.find((t) => typeof t === 'string' && t !== 'mediaDistribution' && t !== 'article')
  if (typeof tag === 'string') return tag
  return 'Update'
}

function EditorialHome({
  primaryTask,
  posts,
  supportTasks,
}: {
  primaryTask?: EnabledTask
  posts: SitePost[]
  supportTasks: EnabledTask[]
}) {
  const tone = getEditorialTone()
  const defaultEditorialTask: TaskKey =
    primaryTask?.key === 'mediaDistribution' || primaryTask?.key === 'article'
      ? primaryTask.key
      : 'article'

  const postHref = (post: SitePost) =>
    getTaskHref(resolveTaskKey((post as { task?: unknown }).task, defaultEditorialTask), post.slug)

  const lead = posts[0]
  const spotlightPosts = posts.slice(1, 4)
  const deckPosts = posts.slice(10, 16)
  const featuredSecondary = posts[1]

  const headline = lead?.title || SITE_CONFIG.name
  const summarySource = lead?.summary || SITE_CONFIG.description
  const [bodyA, bodyB] = splitIntoTwoParagraphs(summarySource)
  const secondParagraph = bodyB || SITE_CONFIG.tagline

  return (
    <main className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900">
      <div className="mx-auto min-h-screen max-w-[1400px]">
        {/* Hero Section - New Layout */}
        <section className="relative px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10" />
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
              style={{
                backgroundImage: 'url("/press-release-hero.jpg")'
              }}
            />
          </div>
          <div className="relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 backdrop-blur px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 mb-6">
                <FileText className="h-4 w-4" />
                Global Press Release Distribution
              </div>
              <h1 className="font-sans text-5xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl mb-6">
                Amplify Your
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Brand Story
                </span>
              </h1>
              <p className="text-xl leading-relaxed text-slate-600 mb-8 max-w-2xl">
                Connect with thousands of journalists and media outlets worldwide. 
                Professional press release distribution that delivers results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={primaryTask?.route || '/articles'}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-white font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Start Distribution
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-8 py-4 text-slate-700 font-bold hover:border-slate-300 hover:bg-slate-50 transition-all"
                >
                  View Plans
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-2xl border border-slate-200">
                <div className="grid gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-black text-blue-600 mb-2">50K+</div>
                    <div className="text-sm font-medium text-slate-600">Press Releases</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-indigo-600 mb-2">2.5K+</div>
                    <div className="text-sm font-medium text-slate-600">Media Partners</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-purple-600 mb-2">12K+</div>
                    <div className="text-sm font-medium text-slate-600">Companies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - New Component */}
        <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32 bg-white">
          <div className="text-center mb-16">
            <h2 className="font-sans text-4xl font-black leading-tight text-slate-900 sm:text-5xl mb-4">
              Distribution
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}Services
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive press release distribution solutions tailored to your needs
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 transition-all hover:shadow-xl hover:border-blue-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-sans text-2xl font-bold text-slate-900 mb-4">Global Reach</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Distribute your press releases to thousands of media outlets worldwide with our global network.
              </p>
              <Link href="#" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700">
                Learn More →
              </Link>
            </div>
            <div className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 transition-all hover:shadow-xl hover:border-indigo-300">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-sans text-2xl font-bold text-slate-900 mb-4">Premium Placement</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Get premium placement on major news sites and industry publications with verified distribution.
              </p>
              <Link href="#" className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700">
                Learn More →
              </Link>
            </div>
            <div className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-purple-50 to-pink-50 p-8 transition-all hover:shadow-xl hover:border-purple-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-sans text-2xl font-bold text-slate-900 mb-4">Analytics & Insights</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Track your press release performance with detailed analytics and real-time insights.
              </p>
              <Link href="#" className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700">
                Learn More →
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Press Release - Redesigned */}
        {lead ? (
          <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="text-center mb-16">
              <h2 className="font-sans text-4xl font-black leading-tight text-slate-900 sm:text-5xl mb-4">
                Featured
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}Release
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Latest announcements from leading organizations
              </p>
            </div>
            <div className="max-w-5xl mx-auto">
              <Link
                href={postHref(lead)}
                className="group block rounded-3xl bg-white p-10 shadow-2xl border border-slate-200 transition-all hover:shadow-3xl hover:border-blue-300"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                        {getPostCategoryLabel(lead)}
                      </span>
                      <span className="text-sm font-medium text-slate-500">
                        {lead.publishedAt ? new Date(lead.publishedAt).toLocaleDateString() : ''}
                      </span>
                    </div>
                    <h3 className="font-sans text-3xl font-black leading-tight text-slate-900 mb-6 group-hover:text-blue-600 transition-colors">
                      {lead.title}
                    </h3>
                    {lead.summary ? (
                      <p className="text-lg leading-relaxed text-slate-600 mb-8">{lead.summary}</p>
                    ) : null}
                    <div className="flex items-center gap-3 text-blue-600 font-bold">
                      Read Full Release
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="lg:w-96">
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl h-64 flex items-center justify-center">
                      <FileText className="h-16 w-16 text-blue-600/50" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        ) : null}

        {/* Recent Press Releases - New Grid Layout */}
        {spotlightPosts.length ? (
          <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32 bg-white">
            <div className="text-center mb-16">
              <h2 className="font-sans text-4xl font-black leading-tight text-slate-900 sm:text-5xl mb-4">
                Recent
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}Releases
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Stay updated with the latest announcements and media updates
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {spotlightPosts.map((post, i) => (
                <Link
                  key={post.id}
                  href={postHref(post)}
                  className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-8 transition-all hover:shadow-xl hover:border-blue-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                      {getPostCategoryLabel(post)}
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                  <h3 className="font-sans text-xl font-bold leading-tight text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  {post.summary ? (
                    <p className="text-sm leading-relaxed text-slate-600 line-clamp-3 mb-6">{post.summary}</p>
                  ) : null}
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {/* Trust Section - New Component */}
        <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32 bg-gradient-to-br from-blue-600 to-indigo-600">
          <div className="text-center mb-16">
            <h2 className="font-sans text-4xl font-black leading-tight text-white sm:text-5xl mb-4">
              Trusted by
              <span className="text-yellow-300">
                {" "}Industry Leaders
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join thousands of organizations that trust Mediavoxer for their press release distribution
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">98%</div>
              <div className="text-sm font-medium text-blue-100">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">24/7</div>
              <div className="text-sm font-medium text-blue-100">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">150+</div>
              <div className="text-sm font-medium text-blue-100">Countries Reached</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">10M+</div>
              <div className="text-sm font-medium text-blue-100">Media Impressions</div>
            </div>
          </div>
        </section>

        {/* CTA Section - Redesigned */}
        <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="text-center">
            <h2 className="font-sans text-4xl font-black leading-tight text-white sm:text-5xl mb-6">
              Ready to Amplify Your Message?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
              Start distributing your press releases today and reach millions of readers worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 px-10 py-5 text-slate-900 font-black hover:from-yellow-500 hover:to-orange-600 transition-all shadow-2xl hover:shadow-3xl text-lg"
              >
                Get Started Now
                <ArrowRight className="h-6 w-6" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-xl border-2 border-slate-600 bg-transparent px-10 py-5 text-white font-bold hover:border-slate-500 hover:bg-slate-800 transition-all text-lg"
              >
                Schedule Demo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function VisualHome({ primaryTask, imagePosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; imagePosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getVisualTone()
  const gallery = imagePosts.length ? imagePosts.slice(0, 5) : articlePosts.slice(0, 5)
  const creators = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <ImageIcon className="h-3.5 w-3.5" />
              Visual publishing system
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Image-led discovery with creator profiles and a more gallery-like browsing rhythm.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/images'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open gallery
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Meet creators
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.slice(0, 5).map((post, index) => (
              <Link
                key={post.id}
                href={getTaskHref(resolveTaskKey(post.task, 'image'), post.slug)}
                className={index === 0 ? `col-span-2 row-span-2 overflow-hidden rounded-[2.4rem] ${tone.panel}` : `overflow-hidden rounded-[1.8rem] ${tone.soft}`}
              >
                <div className={index === 0 ? 'relative h-[360px]' : 'relative h-[170px]'}>
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Visual notes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Larger media surfaces, fewer boxes, stronger pacing.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>This product avoids business-directory density and publication framing. The homepage behaves more like a visual board, with profile surfaces and imagery leading the experience.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {creators.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-40 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Creator profile and visual identity surface.'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function CurationHome({ primaryTask, bookmarkPosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; bookmarkPosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getCurationTone()
  const collections = bookmarkPosts.length ? bookmarkPosts.slice(0, 4) : articlePosts.slice(0, 4)
  const people = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <Bookmark className="h-3.5 w-3.5" />
              Curated collections
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Save, organize, and revisit resources through shelves, boards, and curated collections.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/sbm'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open collections
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Explore curators
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {collections.map((post) => (
              <Link key={post.id} href={getTaskHref(resolveTaskKey(post.task, 'sbm'), post.slug)} className={`rounded-[1.8rem] p-6 ${tone.panel}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Collection</p>
                <h3 className="mt-3 text-2xl font-semibold">{post.title}</h3>
                <p className={`mt-3 text-sm leading-8 ${tone.muted}`}>{post.summary || 'A calmer bookmark surface with room for context and grouping.'}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Why this feels different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">More like saved boards and reading shelves than a generic post feed.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>The structure is calmer, the cards are less noisy, and the page encourages collecting and returning instead of forcing everything into a fast-scrolling list.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {people.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-32 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>Curator profile, saved resources, and collection notes.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const taskFeed: TaskFeedItem[] = (
    await Promise.all(
      enabledTasks.map(async (task) => ({
        task,
        posts: await fetchTaskPosts(task.key, 6, { allowMockFallback: false, fresh: false, revalidate: 120 }),
      }))
    )
  ).filter(({ posts }) => posts.length)

  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]
  const supportTasks = enabledTasks.filter((task) => task.key !== primaryTask?.key)
  const listingPosts = taskFeed.find(({ task }) => task.key === 'listing')?.posts || []
  const classifiedPosts = taskFeed.find(({ task }) => task.key === 'classified')?.posts || []
  const articlePosts = taskFeed.find(({ task }) => task.key === 'article')?.posts || []
  const mediaDistributionPosts =
    taskFeed.find(({ task }) => task.key === 'mediaDistribution')?.posts || []
  const editorialRaw = articlePosts.length ? articlePosts : mediaDistributionPosts
  const editorialPosts =
    editorialRaw.length > 0
      ? editorialRaw.slice(0, 16)
      : mergeEditorialPostsForHome(editorialRaw, getHomeEditorialMockPosts(), 16)
  const imagePosts = taskFeed.find(({ task }) => task.key === 'image')?.posts || []
  const profilePosts = taskFeed.find(({ task }) => task.key === 'profile')?.posts || []
  const bookmarkPosts = taskFeed.find(({ task }) => task.key === 'sbm')?.posts || []

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      {productKind === 'directory' ? (
        <DirectoryHome
          primaryTask={primaryTask}
          enabledTasks={enabledTasks}
          listingPosts={listingPosts}
          classifiedPosts={classifiedPosts}
          profilePosts={profilePosts}
          brandPack={recipe.brandPack}
        />
      ) : null}
      {productKind === 'editorial' ? (
        <EditorialHome primaryTask={primaryTask} posts={editorialPosts} supportTasks={supportTasks} />
      ) : null}
      {productKind === 'visual' ? (
        <VisualHome primaryTask={primaryTask} imagePosts={imagePosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      {productKind === 'curation' ? (
        <CurationHome primaryTask={primaryTask} bookmarkPosts={bookmarkPosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      <Footer />
    </div>
  )
}

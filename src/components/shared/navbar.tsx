'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, MapPin, Plus, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { NAVBAR_OVERRIDE_ENABLED, NavbarOverride } from '@/overrides/navbar'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
  mediaDistribution: FileText,
}

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-[#A2416B]/20 bg-white/88 text-[#852747] backdrop-blur-xl',
    logo: 'rounded-2xl border border-[#A2416B]/20 bg-white shadow-sm',
    active: 'bg-[#A2416B] text-white',
    idle: 'text-[#852747] hover:bg-[#F5C6A5]/30 hover:text-[#A2416B]',
    cta: 'rounded-full bg-[#A2416B] text-white hover:bg-[#852747]',
    mobile: 'border-t border-[#A2416B]/20 bg-white/95',
  },
  'editorial-bar': {
    shell: 'border-b border-[#A2416B]/25 bg-[#FFFBF8]/90 text-[#852747] backdrop-blur-xl',
    logo: 'rounded-full border border-[#A2416B]/25 bg-white shadow-sm',
    active: 'bg-[#A2416B] text-white',
    idle: 'text-[#852747] hover:bg-[#F5C6A5]/30 hover:text-[#A2416B]',
    cta: 'rounded-full bg-[#A2416B] text-white hover:bg-[#852747]',
    mobile: 'border-t border-[#A2416B]/25 bg-[#FFFBF8]',
  },
  'floating-bar': {
    shell: 'border-b border-transparent bg-transparent text-white',
    logo: 'rounded-[1.35rem] border border-white/12 bg-white/8 shadow-[0_16px_48px_rgba(15,23,42,0.22)] backdrop-blur',
    active: 'bg-[#F5C6A5] text-[#852747]',
    idle: 'text-slate-200 hover:bg-white/10 hover:text-white',
    cta: 'rounded-full bg-[#F5C6A5] text-[#852747] hover:bg-[#FF7777]',
    mobile: 'border-t border-white/10 bg-[#09101d]/96',
  },
  'utility-bar': {
    shell: 'border-b border-[#A2416B]/20 bg-[#FFFBF8]/94 text-[#852747] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#A2416B]/20 bg-white shadow-sm',
    active: 'bg-[#A2416B] text-white',
    idle: 'text-[#852747] hover:bg-[#F5C6A5]/30 hover:text-[#A2416B]',
    cta: 'rounded-lg bg-[#A2416B] text-white hover:bg-[#852747]',
    mobile: 'border-t border-[#A2416B]/20 bg-[#FFFBF8]',
  },
} as const

const directoryPalette = {
  'directory-clean': {
    shell: 'border-b border-[#A2416B]/20 bg-white/94 text-[#852747] shadow-[0_1px_0_rgba(162,65,107,0.04)] backdrop-blur-xl',
    logo: 'rounded-2xl border border-[#A2416B]/20 bg-[#FFFBF8]',
    nav: 'text-[#852747] hover:text-[#A2416B]',
    search: 'border border-[#A2416B]/20 bg-[#FFFBF8] text-[#852747]',
    cta: 'bg-[#A2416B] text-white hover:bg-[#852747]',
    post: 'border border-[#A2416B]/20 bg-white text-[#852747] hover:bg-[#F5C6A5]/30',
    mobile: 'border-t border-[#A2416B]/20 bg-white',
  },
  'market-utility': {
    shell: 'border-b border-[#A2416B]/25 bg-[#FFFBF8]/96 text-[#852747] shadow-[0_1px_0_rgba(162,65,107,0.06)] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#A2416B]/25 bg-white',
    nav: 'text-[#852747] hover:text-[#A2416B]',
    search: 'border border-[#A2416B]/25 bg-white text-[#852747]',
    cta: 'bg-[#A2416B] text-white hover:bg-[#852747]',
    post: 'border border-[#A2416B]/25 bg-white text-[#852747] hover:bg-[#F5C6A5]/30',
    mobile: 'border-t border-[#A2416B]/25 bg-[#FFFBF8]',
  },
} as const

export function Navbar() {
  if (NAVBAR_OVERRIDE_ENABLED) {
    return <NavbarOverride />
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const navigation = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile'), [])
  const primaryNavigation = navigation.slice(0, 5)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))
  const primaryTask = SITE_CONFIG.tasks.find((task) => task.key === recipe.primaryTask && task.enabled) || primaryNavigation[0]
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'

  if (isDirectoryProduct) {
    const palette = directoryPalette[(recipe.brandPack === 'market-utility' ? 'market-utility' : 'directory-clean') as keyof typeof directoryPalette]

    return (
      <header className={cn('sticky top-0 z-50 w-full', palette.shell)}>
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <div className={cn('flex h-12 w-12 items-center justify-center overflow-hidden p-1.5', palette.logo)}>
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 hidden sm:block">
                <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
                <span className="block text-[10px] uppercase tracking-[0.24em] opacity-60">{siteContent.navbar.tagline}</span>
              </div>
            </Link>

            <div className="hidden items-center gap-5 xl:flex">
              {primaryNavigation.slice(0, 4).map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('text-sm font-semibold transition-colors', isActive ? 'text-foreground' : palette.nav)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <div className={cn('flex w-full max-w-xl items-center gap-3 rounded-full px-4 py-3', palette.search)}>
              <Search className="h-4 w-4" />
              <span className="text-sm">Find businesses, spaces, and local services</span>
              <div className="ml-auto hidden items-center gap-1 text-xs opacity-75 md:flex">
                <MapPin className="h-3.5 w-3.5" />
                Local discovery
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {primaryTask ? (
              <Link href={primaryTask.route} className="hidden items-center gap-2 rounded-full border border-current/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] opacity-75 md:inline-flex">
                <Sparkles className="h-3.5 w-3.5" />
                {primaryTask.label}
              </Link>
            ) : null}

            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild className={cn('rounded-full', palette.cta)}>
                  <Link href="/register">
                    <Plus className="mr-1 h-4 w-4" />
                    Add Listing
                  </Link>
                </Button>
              </div>
            )}

            <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className={palette.mobile}>
            <div className="space-y-2 px-4 py-4">
              <div className={cn('mb-3 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium', palette.search)}>
                <Search className="h-4 w-4" />
                Find businesses, spaces, and services
              </div>
              {mobileNavigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? 'bg-foreground text-background' : palette.post)}>
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>
    )
  }

  // Globalbriefingai-style clean header for all non-directory variants
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Logo + site name + tagline */}
        <Link href="/" className="flex shrink-0 items-center gap-3 whitespace-nowrap">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm">
            <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="40" height="40" className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0 hidden sm:block">
            <span className="block truncate text-[15px] font-bold leading-tight text-gray-900">{SITE_CONFIG.name}</span>
            <span className="block text-[9px] uppercase tracking-[0.22em] text-gray-400">{siteContent.navbar.tagline}</span>
          </div>
        </Link>

        {/* Center nav links */}
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
          {primaryNavigation.map((task) => {
            const isActive = pathname.startsWith(task.route)
            return (
              <Link
                key={task.key}
                href={task.route}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {task.label}
              </Link>
            )
          })}
        </div>

        {/* Right: search + CTA */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" asChild className="hidden rounded-full text-gray-500 hover:text-gray-900 md:flex">
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button
                size="sm"
                asChild
                className="rounded-full bg-[#6B4EFF] px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#5a3ee0]"
              >
                <Link href="/create/article">Submit Release</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="rounded-full text-gray-600 lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white">
          <div className="space-y-1 px-4 py-3">
            <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="mb-2 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-500">
              <Search className="h-4 w-4" />
              Search the site
            </Link>
            {mobileNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                    isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
            {!isAuthenticated && (
              <div className="pt-2">
                <Button size="sm" asChild className="w-full rounded-full bg-[#6B4EFF] text-white hover:bg-[#5a3ee0]">
                  <Link href="/create/article" onClick={() => setIsMobileMenuOpen(false)}>Submit Release</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

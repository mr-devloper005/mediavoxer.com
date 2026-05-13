'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Latest News', href: '/updates' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center whitespace-nowrap">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Center nav links */}
        <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-colors',
                  isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Right: search + CTA */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hidden rounded-full text-gray-500 hover:text-gray-900 md:flex"
          >
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          <Button
            size="sm"
            asChild
            className="hidden rounded-full bg-[#6B4EFF] px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#5a3ee0] md:inline-flex"
          >
            <Link href="/contact">Submit Release</Link>
          </Button>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-gray-600 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white">
          <div className="space-y-1 px-4 py-3">
            <Link
              href="/search"
              onClick={() => setMobileOpen(false)}
              className="mb-2 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-500"
            >
              <Search className="h-4 w-4" />
              Search the site
            </Link>
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                    isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="pt-2">
              <Button
                size="sm"
                asChild
                className="w-full rounded-full bg-[#6B4EFF] text-white hover:bg-[#5a3ee0]"
              >
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  Submit Release
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

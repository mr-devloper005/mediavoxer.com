import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

function getTone(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#FFFBF8] text-[#852747]',
      panel: 'border border-[#A2416B]/20 bg-white',
      soft: 'border border-[#A2416B]/15 bg-[#FFFBF8]',
      muted: 'text-[#852747]/80',
      action: 'bg-[#A2416B] text-white hover:bg-[#852747]',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#FFFBF8] text-[#852747]',
      panel: 'border border-[#A2416B]/20 bg-white',
      soft: 'border border-[#A2416B]/15 bg-[#FFFBF8]',
      muted: 'text-[#852747]/80',
      action: 'bg-[#A2416B] text-white hover:bg-[#852747]',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      soft: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      action: 'bg-[#F5C6A5] text-[#852747] hover:bg-[#FF7777]',
    }
  }
  return {
    shell: 'bg-[#FFFBF8] text-[#852747]',
    panel: 'border border-[#A2416B]/20 bg-white',
    soft: 'border border-[#A2416B]/15 bg-[#FFFBF8]',
    muted: 'text-[#852747]/80',
    action: 'bg-[#A2416B] text-white hover:bg-[#852747]',
  }
}

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)
  const lanes = [
    { icon: FileText, title: 'Press Release Distribution', body: 'Get help with press release submission, distribution, and media outreach services.' },
    { icon: Mail, title: 'Media Partnerships', body: 'Coordinate media partnerships, press coverage, and journalist collaborations.' },
    { icon: Sparkles, title: 'Account Support', body: 'Assistance with account setup, billing, and platform features for optimal press release distribution.' },
  ]

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Contact {SITE_CONFIG.name}</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">Professional press release distribution support.</h1>
            <p className={`mt-5 max-w-2xl text-sm leading-8 ${tone.muted}`}>Whether you need help with press release distribution, media partnerships, or account support, our team is here to help you maximize your media outreach.</p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                  <lane.icon className="h-5 w-5" />
                  <h2 className="mt-3 text-xl font-semibold">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <h2 className="text-2xl font-semibold">Send a message</h2>
            <form className="mt-6 grid gap-4">
              <input className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" placeholder="Your name" />
              <input className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" placeholder="Email address" />
              <input className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" placeholder="What do you need help with?" />
              <textarea className="min-h-[180px] rounded-2xl border border-current/10 bg-transparent px-4 py-3 text-sm" placeholder="Share the full context so we can respond with the right next step." />
              <button type="submit" className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${tone.action}`}>Send message</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

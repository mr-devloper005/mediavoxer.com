import { Mail, Send } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <NavbarShell />
      
      {/* Hero Section */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 backdrop-blur px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 mb-8">
              <Mail className="h-4 w-4" />
              Get in Touch
            </div>
            <h1 className="font-sans text-5xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl mb-8">
              Contact
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}Mediavoxer
              </span>
            </h1>
            <p className="text-xl leading-relaxed text-slate-600 max-w-3xl mx-auto">
              Have questions about our Release Media distribution services? 
              Our team is here to help you amplify your brand story.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Information */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Get in Touch</h2>
                <p className="text-lg text-slate-600 mb-8">
                  We're here to help with your Release Media distribution needs. 
                  Reach out to us through any of the following channels.
                </p>
              </div>

            </div>

            {/* Contact Form */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Acme Corporation"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="">Select a topic</option>
                    <option value="distribution">Release Media Distribution</option>
                    <option value="partnerships">Media Partnerships</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing & Pricing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Tell us how we can help with your Release Media distribution needs..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-white font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl w-full justify-center"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

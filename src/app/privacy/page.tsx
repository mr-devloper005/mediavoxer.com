import Link from "next/link";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { Shield, Database, Eye, Settings, Lock, UserCheck } from "lucide-react";

const sections = [
  { 
    title: 'Data We Collect', 
    body: 'Account information, usage analytics, and content you submit. We collect only what\'s necessary to provide our press release distribution services.',
    icon: Database
  },
  { 
    title: 'How We Use Data', 
    body: 'To personalize your experience, improve search, and keep the platform secure. Your data helps us connect you with the right media outlets.',
    icon: Eye
  },
  { 
    title: 'Your Choices', 
    body: 'You can manage email preferences and delete your account at any time. We believe in giving you full control over your information.',
    icon: Settings
  },
  {
    title: 'Data Protection',
    body: 'We use industry-standard encryption and security measures to protect your press releases and personal information from unauthorized access.',
    icon: Lock
  },
  {
    title: 'Third-Party Sharing',
    body: 'We only share your press releases with verified media outlets and journalists you authorize. We never sell your personal information to third parties.',
    icon: UserCheck
  }
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <NavbarShell />
      
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600 mb-6">
            <Shield className="h-3.5 w-3.5" />
            Privacy & Security
          </div>
          <h1 className="text-4xl font-bold tracking-[-0.04em] text-slate-900 sm:text-5xl lg:text-6xl mb-6">
            Privacy Policy
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-8">
            How we collect, use, and protect your information. Your privacy is fundamental to our press release distribution platform.
          </p>
        </div>

        {/* Privacy Content */}
        <div className="space-y-8 mb-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
            <p className="text-sm text-slate-500 mb-6">Last updated: March 16, 2026</p>
            
            <div className="space-y-6">
              {sections.map((section) => (
                <div key={section.title} className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-6 transition-all hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-blue-100 p-3 flex-shrink-0">
                      <section.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">{section.title}</h3>
                      <p className="text-slate-600 leading-7">{section.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="grid gap-8 lg:grid-cols-2 mb-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Your Data Rights</h3>
            <p className="text-slate-600 mb-6">
              You have the right to access, modify, or delete your personal information. We provide tools to help you manage your privacy settings.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-slate-700">Access your data anytime</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-slate-700">Request data deletion</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-slate-700">Control email preferences</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Security Measures</h3>
            <p className="text-slate-600 mb-6">
              We implement industry-standard security protocols to protect your press releases and personal information.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-slate-700">256-bit SSL encryption</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-slate-700">Regular security audits</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-slate-700">GDPR compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-2xl p-12 border border-blue-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Privacy Questions?
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Our privacy team is here to help with any questions about how we handle your data and protect your privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-white font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              Contact Privacy Team
            </Link>
            <Link 
              href="/terms" 
              className="inline-flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-8 py-4 text-slate-700 font-bold hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              View Terms of Service
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

import Link from "next/link";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { SITE_CONFIG } from "@/lib/site-config";
import { FileText, Shield, Users, AlertCircle } from "lucide-react";

const sections = [
  { 
    title: "Account Usage", 
    body: "Keep your account secure and follow community guidelines. You are responsible for maintaining the confidentiality of your account credentials.",
    icon: Shield
  },
  {
    title: "Content Ownership",
    body: "You own the content you publish and grant the platform a license to display it. This includes Release Media, media assets, and other materials you share through our service.",
    icon: FileText
  },
  { 
    title: "Acceptable Use", 
    body: "No spam, harassment, or illegal content. All Release Media must be factual, professional, and comply with applicable laws and regulations.",
    icon: AlertCircle
  },
  {
    title: "Service Terms",
    body: "Our Release Media distribution services are provided on a subscription basis. Payment terms and service level agreements are outlined in your specific plan.",
    icon: Users
  }
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <NavbarShell />
      
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600 mb-6">
            <FileText className="h-3.5 w-3.5" />
            Legal Information
          </div>
          <h1 className="text-4xl font-bold tracking-[-0.04em] text-slate-900 sm:text-5xl lg:text-6xl mb-6">
            Terms of Service
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-8">
            The rules and guidelines for using {SITE_CONFIG.name}. Please read these terms carefully before using our Release Media distribution platform.
          </p>
        </div>

        {/* Terms Content */}
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

        {/* Additional Information */}
        <div className="grid gap-8 lg:grid-cols-2 mb-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h3>
            <p className="text-slate-600 mb-6">
              If you have questions about these terms or need clarification, please don't hesitate to reach out to our legal team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
              >
                Contact Legal Team
              </Link>
              <Link 
                href="/support" 
                className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-slate-700 font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                Get Support
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Privacy Policy</h3>
            <p className="text-slate-600 mb-6">
              Learn how we collect, use, and protect your personal information in accordance with applicable privacy laws.
            </p>
            <Link 
              href="/privacy" 
              className="inline-flex items-center gap-2 rounded-xl border-2 border-blue-200 bg-blue-50 px-6 py-3 text-blue-700 font-semibold hover:bg-blue-100 transition-all"
            >
              View Privacy Policy
            </Link>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-2xl p-12 border border-blue-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Questions about our terms?
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Our team is here to help you understand your rights and responsibilities as a {SITE_CONFIG.name} user.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-white font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            Get in Touch
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

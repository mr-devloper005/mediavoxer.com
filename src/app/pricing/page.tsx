import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Star, ArrowRight, HelpCircle, Mail } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/pricing',
    title: 'Pricing Plans - Mediavoxer',
    description: 'Choose the perfect press release distribution plan for your organization. Professional media distribution with global reach.',
    keywords: ['press release pricing', 'media distribution plans', 'public relations pricing'],
  })
}

const pricingPlans = [
  {
    name: 'Basic',
    description: 'Perfect for small businesses and startups',
    price: '$99',
    period: 'per month',
    features: [
      'Up to 5 press releases per month',
      'Basic media distribution',
      'Standard press release template',
      'Email support',
      '7-day archive access',
      'Basic analytics dashboard',
    ],
    excluded: [
      'Priority distribution',
      'Custom branding',
      'Advanced analytics',
      'Media contact database',
      'Dedicated account manager',
    ],
    popular: false,
    cta: 'Start Basic Plan',
    ctaHref: '/register?plan=basic',
  },
  {
    name: 'Professional',
    description: 'Ideal for growing companies and PR agencies',
    price: '$299',
    period: 'per month',
    features: [
      'Up to 20 press releases per month',
      'Priority media distribution',
      'Custom press release templates',
      'Priority email & phone support',
      '30-day archive access',
      'Advanced analytics & insights',
      'Media contact database access',
      'Custom branding options',
      'Social media amplification',
    ],
    excluded: [
      'White-glove service',
      'Guaranteed placement',
      'Custom media lists',
    ],
    popular: true,
    cta: 'Start Professional Plan',
    ctaHref: '/register?plan=professional',
  },
  {
    name: 'Enterprise',
    description: 'Complete solution for large organizations',
    price: 'Custom',
    period: 'contact us',
    features: [
      'Unlimited press releases',
      'Premium media distribution',
      'Fully custom templates',
      '24/7 dedicated support',
      'Unlimited archive access',
      'Enterprise analytics suite',
      'Premium media contacts',
      'Full white-glove service',
      'Guaranteed premium placement',
      'Custom media lists',
      'Dedicated account manager',
      'API access & integrations',
    ],
    excluded: [],
    popular: false,
    cta: 'Contact Sales',
    ctaHref: '/contact?plan=enterprise',
  },
]

const addOns = [
  {
    name: 'Media Contact Database',
    description: 'Access to our comprehensive database of journalists and media contacts',
    price: '$49',
    period: 'per month',
    features: ['50,000+ media contacts', 'Advanced filtering', 'Contact export', 'Regular updates'],
  },
  {
    name: 'Analytics Pro',
    description: 'Advanced analytics and reporting for your press releases',
    price: '$79',
    period: 'per month',
    features: ['Real-time tracking', 'Sentiment analysis', 'Competitor insights', 'Custom reports'],
  },
  {
    name: 'Social Amplification',
    description: 'Amplify your press releases across social media platforms',
    price: '$99',
    period: 'per month',
    features: ['Multi-platform posting', 'Social analytics', 'Content optimization', 'Scheduling tools'],
  },
]

const faqs = [
  {
    question: 'What is included in the media distribution?',
    answer: 'Our media distribution includes delivery to thousands of journalists, news websites, bloggers, and media outlets. We cover major news wires, industry-specific publications, and regional media outlets to ensure maximum reach for your press releases.',
  },
  {
    question: 'Can I change my plan anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle. If you need to make immediate changes, contact our support team for assistance.',
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer: 'Yes, we offer a 20% discount for annual billing on all plans. Contact our sales team to set up annual billing and take advantage of this cost savings.',
  },
  {
    question: 'What kind of support do you provide?',
    answer: 'Basic plans include email support with 48-hour response time. Professional plans include priority email and phone support with 24-hour response time. Enterprise plans include 24/7 dedicated support with a dedicated account manager.',
  },
  {
    question: 'Can I cancel my subscription?',
    answer: "Yes, you can cancel your subscription at any time. Your service will continue until the end of your current billing period, and you won't be charged again. No cancellation fees apply.",
  },
  {
    question: 'Do you provide writing services?',
    answer: "While we don't include press release writing in our standard plans, we can connect you with professional writers through our Enterprise plan or as an add-on service. Contact us for more information.",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <NavbarShell />

      <main>
        {/* Hero Section */}
        <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 backdrop-blur">
              <Star className="h-3.5 w-3.5" />
              Pricing Plans
            </div>
            <h1 className="mb-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Choose your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                distribution plan
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              Professional media distribution plans designed for businesses of all sizes.
              From startups to enterprises, we have the right solution for your PR needs.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border bg-white p-8 shadow-lg transition-all hover:shadow-xl ${
                    plan.popular
                      ? 'border-blue-500 ring-2 ring-blue-500/20 scale-105'
                      : 'border-slate-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-md">
                        <Star className="h-3 w-3" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="mb-2 text-2xl font-bold text-slate-900">{plan.name}</h3>
                    <p className="mb-6 text-slate-500">{plan.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-4xl font-black ${
                          plan.popular
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
                            : 'text-slate-900'
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span className="text-slate-500">{plan.period}</span>
                    </div>
                  </div>

                  <div className="mb-8 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100">
                          <Check className="h-3 w-3 text-blue-600" />
                        </div>
                        <span className="text-sm text-slate-700">{feature}</span>
                      </div>
                    ))}
                    {plan.excluded.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 opacity-40">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                          <div className="h-px w-3 rounded-full bg-slate-400" />
                        </div>
                        <span className="text-sm text-slate-500">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={plan.ctaHref}
                    className={`block w-full rounded-xl px-6 py-3 text-center font-bold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg'
                        : 'border-2 border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-black text-slate-900 sm:text-4xl">
                Enhance Your{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Plan
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                Add powerful features to your press release distribution with our premium add-ons
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {addOns.map((addOn) => (
                <div
                  key={addOn.name}
                  className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-6 transition-all hover:border-blue-300 hover:shadow-lg"
                >
                  <h3 className="mb-2 text-xl font-bold text-slate-900">{addOn.name}</h3>
                  <p className="mb-4 text-slate-500">{addOn.description}</p>
                  <div className="mb-4 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-blue-600">{addOn.price}</span>
                    <span className="text-slate-500">{addOn.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {addOn.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="h-4 w-4 text-blue-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-black text-slate-900 sm:text-4xl">
                Frequently Asked{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              <p className="text-lg text-slate-600">
                Everything you need to know about our pricing and services
              </p>
            </div>

            <div className="mx-auto max-w-3xl space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-slate-900">{faq.question}</h3>
                      <p className="leading-relaxed text-slate-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-12 text-center shadow-2xl">
              <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">
                Ready to distribute your press releases?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
                Join thousands of organizations that trust Mediavoxer for their media distribution needs
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-blue-600 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
                >
                  Get Started Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur transition-all hover:bg-white/20"
                >
                  Contact Sales
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

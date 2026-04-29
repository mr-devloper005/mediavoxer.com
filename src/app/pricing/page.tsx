import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Star, ArrowRight, HelpCircle, Zap, Globe, BarChart3, Users, FileText, Shield, Mail, Phone } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPageMetadata } from '@/lib/seo'
import { siteContent } from '@/config/site.content'

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
    answer: 'Yes, you can cancel your subscription at any time. Your service will continue until the end of your current billing period, and you won\'t be charged again. No cancellation fees apply.',
  },
  {
    question: 'Do you provide writing services?',
    answer: 'While we don\'t include press release writing in our standard plans, we can connect you with professional writers through our Enterprise plan or as an add-on service. Contact us for more information.',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF8]">
      <NavbarShell />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#A2416B]/25 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#852747] mb-6">
            <Star className="h-3.5 w-3.5" />
            Pricing Plans
          </div>
          <h1 className="text-4xl font-bold tracking-[-0.04em] text-[#852747] sm:text-5xl lg:text-6xl mb-6">
            Choose your press release distribution plan
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#852747]/80 leading-8">
            Professional media distribution plans designed for businesses of all sizes. 
            From startups to enterprises, we have the right solution for your PR needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 mb-20">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border bg-white p-8 shadow-lg transition-all hover:shadow-xl ${
                plan.popular
                  ? 'border-[#A2416B] ring-2 ring-[#A2416B]/20 scale-105'
                  : 'border-[#A2416B]/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex items-center gap-1 rounded-full bg-[#A2416B] px-3 py-1 text-xs font-semibold text-white">
                    <Star className="h-3 w-3" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#852747] mb-2">{plan.name}</h3>
                <p className="text-[#852747]/70 mb-6">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-[#A2416B]">{plan.price}</span>
                  <span className="text-[#852747]/70 ml-2">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#A2416B] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#852747]">{feature}</span>
                  </div>
                ))}
                {plan.excluded.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 opacity-50">
                    <div className="h-5 w-5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                      <div className="h-1 w-3 bg-[#852747]/30 rounded-full" />
                    </div>
                    <span className="text-sm text-[#852747]/50">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.ctaHref}
                className={`block w-full text-center rounded-full px-6 py-3 font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-[#A2416B] text-white hover:bg-[#852747]'
                    : 'border border-[#A2416B]/20 bg-white text-[#852747] hover:bg-[#F5C6A5]/30'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#852747] mb-4">Enhance Your Plan</h2>
            <p className="text-lg text-[#852747]/80 max-w-2xl mx-auto">
              Add powerful features to your press release distribution with our premium add-ons
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {addOns.map((addOn) => (
              <div key={addOn.name} className="rounded-xl border border-[#A2416B]/20 bg-white p-6">
                <h3 className="text-xl font-semibold text-[#852747] mb-2">{addOn.name}</h3>
                <p className="text-[#852747]/70 mb-4">{addOn.description}</p>
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold text-[#A2416B]">{addOn.price}</span>
                  <span className="text-[#852747]/70 ml-2">{addOn.period}</span>
                </div>
                <ul className="space-y-2">
                  {addOn.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[#852747]/80">
                      <Check className="h-4 w-4 text-[#A2416B]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#852747] mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-[#852747]/80">
              Everything you need to know about our pricing and services
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-[#A2416B]/20 rounded-xl bg-white p-6">
                  <div className="flex items-start gap-4">
                    <HelpCircle className="h-5 w-5 text-[#A2416B] mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-[#852747] mb-2">{faq.question}</h3>
                      <p className="text-[#852747]/70 leading-7">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#A2416B]/10 to-[#F5C6A5]/10 rounded-2xl p-12 border border-[#A2416B]/20">
          <h2 className="text-3xl font-bold text-[#852747] mb-4">
            Ready to distribute your press releases?
          </h2>
          <p className="text-lg text-[#852747]/80 mb-8 max-w-2xl mx-auto">
            Join thousands of organizations that trust Mediavoxer for their media distribution needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-[#A2416B] px-6 py-3 text-white font-semibold hover:bg-[#852747] transition-colors"
            >
              Get Started Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#A2416B]/20 bg-white px-6 py-3 text-[#852747] font-semibold hover:bg-[#F5C6A5]/30 transition-colors"
            >
              Contact Sales
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

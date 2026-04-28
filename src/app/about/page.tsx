import Link from "next/link";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SITE_CONFIG } from "@/lib/site-config";
import { Globe, Users, FileText, TrendingUp, Award, Target } from "lucide-react";

const highlights = [
  { label: "Press Releases Distributed", value: "50k+" },
  { label: "Media Partners", value: "2,500+" },
  { label: "Companies Served", value: "12k+" },
];

const values = [
  { title: "Professional Distribution", description: "We connect your press releases with thousands of journalists and media outlets worldwide.", icon: Globe },
  { title: "Media Expertise", description: "Our team understands the media landscape and helps craft compelling press releases that get noticed.", icon: FileText },
  { title: "Global Reach", description: "From local news to international media, we ensure your story reaches the right audience.", icon: Target },
];

const teamMembers = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO & Founder",
    bio: "Former PR executive with 15+ years in media distribution and communications.",
    avatar: "/placeholder.svg?height=100&width=100&text=SC",
    location: "New York, NY"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Head of Media Relations",
    bio: "Experienced journalist turned media strategist with deep industry connections.",
    avatar: "/placeholder.svg?height=100&width=100&text=MR",
    location: "Los Angeles, CA"
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Director of Operations",
    bio: "Operations expert focused on scaling press release distribution and client success.",
    avatar: "/placeholder.svg?height=100&width=100&text=EW",
    location: "Chicago, IL"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF8]">
      <NavbarShell />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#A2416B]/25 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#852747] mb-6">
            <Award className="h-3.5 w-3.5" />
            About Mediavoxer
          </div>
          <h1 className="text-4xl font-bold tracking-[-0.04em] text-[#852747] sm:text-5xl lg:text-6xl mb-6">
            Professional press release distribution for the modern era
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#852747]/80 leading-8">
            We're transforming how organizations share their news with the world. Our platform connects 
            businesses with journalists, media outlets, and global audiences through intelligent distribution.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid gap-6 sm:grid-cols-3 mb-16">
          {highlights.map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#A2416B]/20 bg-white p-6 text-center">
              <div className="text-3xl font-bold text-[#A2416B] mb-2">{item.value}</div>
              <div className="text-sm text-[#852747]/80">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] mb-16">
          <div className="rounded-2xl border border-[#A2416B]/20 bg-white p-8">
            <Badge variant="secondary" className="mb-4 bg-[#A2416B]/10 text-[#A2416B] border-[#A2416B]/20">Our Story</Badge>
            <h2 className="text-3xl font-semibold text-[#852747] mb-4">
              Building the future of media distribution
            </h2>
            <p className="text-[#852747]/80 leading-7 mb-4">
              Founded in 2020, Mediavoxer emerged from a simple observation: traditional press release 
              distribution was broken. Companies struggled to reach the right journalists, and media 
              professionals were overwhelmed with irrelevant pitches.
            </p>
            <p className="text-[#852747]/80 leading-7">
              We built Mediavoxer to solve this problem with intelligent matching, comprehensive media 
              databases, and analytics that show real impact. Today, we're trusted by thousands of 
              organizations to share their stories with the world.
            </p>
          </div>
          
          <div className="space-y-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-[#A2416B]/20 bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#A2416B]/10 p-3">
                    <value.icon className="h-5 w-5 text-[#A2416B]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#852747] mb-2">{value.title}</h3>
                    <p className="text-sm text-[#852747]/80 leading-6">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#852747] mb-4">Meet Our Leadership Team</h2>
            <p className="text-lg text-[#852747]/80">
              Media professionals dedicated to your success
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="rounded-2xl border border-[#A2416B]/20 bg-white p-6 transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-[#A2416B]/10 text-[#A2416B] font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-[#852747]">{member.name}</h3>
                    <p className="text-sm text-[#852747]/70">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-[#852747]/80 leading-6 mb-3">{member.bio}</p>
                <p className="text-xs text-[#852747]/60">{member.location}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#A2416B]/10 to-[#F5C6A5]/10 rounded-2xl p-12 border border-[#A2416B]/20">
          <h2 className="text-3xl font-bold text-[#852747] mb-4">
            Ready to amplify your message?
          </h2>
          <p className="text-lg text-[#852747]/80 mb-8 max-w-2xl mx-auto">
            Join thousands of organizations that trust Mediavoxer for their press release distribution needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#A2416B] hover:bg-[#852747] text-white rounded-full">
              <Link href="/pricing">
                View Pricing Plans
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-[#A2416B]/20 text-[#852747] hover:bg-[#F5C6A5]/30 rounded-full">
              <Link href="/contact">
                Contact Our Team
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

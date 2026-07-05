import Link from "next/link"
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"

import { Container } from "@/components/shared/container"
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/shared/social-icons"
import { navLinks } from "@/constants/site"
import type { Profile, SocialLink } from "@/generated/prisma/client"

const socialIcons = {
  GITHUB: GithubIcon,
  LINKEDIN: LinkedinIcon,
  TWITTER: TwitterIcon,
  FACEBOOK: FacebookIcon,
  OTHER: null,
} as const

export function Footer({
  profile,
  socialLinks,
}: {
  profile: Profile
  socialLinks: SocialLink[]
}) {
  const contactItems = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    profile.phone && {
      icon: Phone,
      label: profile.phone,
      href: `tel:${profile.phone.replace(/\s+/g, "")}`,
    },
    profile.location && { icon: MapPin, label: profile.location, href: null },
  ].filter(Boolean) as { icon: typeof Mail; label: string; href: string | null }[]

  return (
    <footer className="relative mt-24">
      {/* top divider glow */}
      <div className="via-primary/40 h-px bg-gradient-to-r from-transparent to-transparent" />

      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold">
              <span className="bg-gradient-brand flex size-9 items-center justify-center rounded-lg text-sm font-black text-white">
                {profile.name.charAt(0)}
              </span>
              {profile.name}
            </Link>
            {profile.tagline && (
              <p className="text-muted-foreground mt-4 max-w-sm text-sm leading-relaxed">
                {profile.tagline}
              </p>
            )}

            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.platform]
                if (!Icon) return null
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="glass hover:text-primary hover:border-primary/40 flex size-10 items-center justify-center rounded-full transition-all hover:-translate-y-1"
                  >
                    <Icon className="size-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* quick links */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase">Explore</h3>
            <nav className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  scroll={false}
                  className="text-muted-foreground hover:text-primary group flex w-fit items-center gap-1 text-sm transition-colors"
                >
                  {link.label}
                  <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
          </div>

          {/* contact */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase">Get in touch</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {contactItems.map((item) => {
                const inner = (
                  <>
                    <span className="bg-accent text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
                      <item.icon className="size-4" />
                    </span>
                    <span className="text-muted-foreground text-sm">{item.label}</span>
                  </>
                )
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="hover:text-primary flex items-center gap-3 transition-colors"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3">{inner}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="border-glass-border mt-14 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Built with Next.js, Tailwind CSS &amp; Prisma
          </p>
        </div>
      </Container>
    </footer>
  )
}

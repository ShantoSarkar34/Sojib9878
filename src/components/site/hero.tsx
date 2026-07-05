"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download, Sparkles } from "lucide-react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  type Variants,
} from "framer-motion"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/shared/social-icons"
import { cn } from "@/lib/utils"
import type { Profile, SocialLink } from "@/generated/prisma/client"

const socialIcons = {
  GITHUB: GithubIcon,
  LINKEDIN: LinkedinIcon,
  TWITTER: TwitterIcon,
  FACEBOOK: FacebookIcon,
  OTHER: ArrowRight,
} as const

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function Hero({
  profile,
  socialLinks,
  highlightSkills,
}: {
  profile: Profile
  socialLinks: SocialLink[]
  highlightSkills: string[]
}) {
  const words = profile.title.split(" ")

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, var(--accent), transparent 65%)`

  return (
    <section
      id="home"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        mouseX.set(event.clientX - rect.left)
        mouseY.set(event.clientY - rect.top)
      }}
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-24 pb-20"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{ background: spotlight }}
      />

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Available for new projects
            </span>
          </motion.div>

          <motion.h3
            variants={item}
            className="text-muted-foreground mt-6 text-lg font-medium"
          >
            Hi, I&apos;m {profile.name} 👋
          </motion.h3>

          <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            <span className="sr-only">{profile.title}</span>
            <span aria-hidden className="flex flex-wrap gap-x-4">
              {words.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  variants={item}
                  className="text-gradient-shimmer inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {profile.tagline && (
            <motion.p
              variants={item}
              className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed"
            >
              {profile.tagline}
            </motion.p>
          )}

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/projects" />}
              className="bg-gradient-brand h-12 gap-2 rounded-full px-7 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03] hover:shadow-primary/40"
            >
              View My Work
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              disabled={!profile.resumeUrl}
              nativeButton={!profile.resumeUrl}
              className="glass h-12 gap-2 rounded-full px-7 text-base"
              render={
                profile.resumeUrl ? (
                  <a
                    href={profile.resumeUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ) : undefined
              }
            >
              <Download className="size-4" />
              {profile.resumeUrl ? "Resume" : "Resume soon"}
            </Button>
          </motion.div>

          {socialLinks.length > 0 && (
            <motion.div variants={item} className="mt-10 flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.platform]
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="glass hover:text-primary flex size-11 items-center justify-center rounded-full transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <Icon className="size-5" />
                  </a>
                )
              })}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
          className="relative mx-auto aspect-square w-full max-w-[24rem]"
        >
          {/* rotating conic gradient ring */}
          <div className="animate-spin-slow bg-gradient-brand absolute -inset-3 rounded-full opacity-70 blur-md" />
          <div className="bg-background absolute inset-0 rounded-full" />
          <div className="border-glass-border relative h-full w-full overflow-hidden rounded-full border">
            {profile.photoUrl ? (
              <Image
                src={profile.photoUrl}
                alt={profile.name}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 24rem, 20rem"
              />
            ) : (
              <div className="bg-muted flex h-full w-full items-center justify-center text-7xl font-bold">
                {profile.name.charAt(0)}
              </div>
            )}
          </div>

          {/* floating skill pills */}
          {highlightSkills.slice(0, 3).map((skill, index) => (
            <motion.div
              key={skill}
              className={cn(
                "glass absolute flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium shadow-lg",
                index === 0 && "-top-2 -left-4",
                index === 1 && "top-1/3 -right-6",
                index === 2 && "-bottom-2 left-6"
              )}
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 5 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.6,
              }}
            >
              <Sparkles className="text-primary size-3.5" />
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="border-glass-border flex h-9 w-5 items-start justify-center rounded-full border p-1.5">
          <div className="bg-muted-foreground h-2 w-1 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}

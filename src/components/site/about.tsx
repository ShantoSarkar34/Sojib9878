import { Code2, Mail, MapPin, Rocket, Smartphone, Sparkles } from "lucide-react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { AnimatedSection } from "@/components/shared/animated-section"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import { SpotlightCard } from "@/components/shared/spotlight-card"
import type { Profile } from "@/generated/prisma/client"

const highlights = [
  {
    icon: Code2,
    title: "Clean, maintainable code",
    description: "Readable, well-structured, and built to scale.",
  },
  {
    icon: Smartphone,
    title: "Responsive by default",
    description: "Pixel-perfect from mobile to ultra-wide.",
  },
  {
    icon: Sparkles,
    title: "Delightful interactions",
    description: "Smooth motion and thoughtful micro-details.",
  },
  {
    icon: Rocket,
    title: "Performance-minded",
    description: "Fast loads and buttery-smooth rendering.",
  },
]

const learning = ["TypeScript", "Prisma", "SQL"]

export function About({
  profile,
  skillCount,
}: {
  profile: Profile
  skillCount: number
}) {
  const paragraphs = profile.bio.split("\n\n").filter(Boolean)
  const [lead, ...rest] = paragraphs

  const stats = [
    { value: 1.5, suffix: "+", label: "Years Experience" },
    { value: 3, suffix: "+", label: "Plugins Maintained" },
    { value: skillCount, suffix: "+", label: "Technologies" },
  ]

  return (
    <section id="about" className="py-28">
      <Container>
        <SectionHeading
          eyebrow="About Me"
          title="Turning ideas into interfaces"
          description="A little about who I am, how I got here, and what I care about when I build."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* narrative */}
          <AnimatedSection>
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col gap-5 p-8 sm:p-10">
                <p className="text-foreground text-xl leading-relaxed font-medium text-balance">
                  {lead}
                </p>
                {rest.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-muted-foreground leading-relaxed whitespace-pre-line"
                  >
                    {paragraph}
                  </p>
                ))}

                <div className="border-glass-border mt-auto flex flex-wrap gap-4 border-t pt-6 text-sm">
                  {profile.location && (
                    <span className="flex items-center gap-2">
                      <MapPin className="text-primary size-4" />
                      {profile.location}
                    </span>
                  )}
                  <a
                    href={`mailto:${profile.email}`}
                    className="hover:text-primary flex items-center gap-2 transition-colors"
                  >
                    <Mail className="text-primary size-4" />
                    {profile.email}
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </AnimatedSection>

          {/* stats + highlights */}
          <div className="flex flex-col gap-8">
            <AnimatedSection delay={0.1}>
              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass flex flex-col items-center rounded-2xl p-4 text-center"
                  >
                    <span className="text-gradient-brand text-3xl font-black">
                      <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="text-muted-foreground mt-1 text-xs">{stat.label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-75" />
                    <span className="bg-primary relative inline-flex size-2 rounded-full" />
                  </span>
                  <h3 className="text-sm font-semibold tracking-wide uppercase">
                    Currently Learning
                  </h3>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {learning.map((tech) => (
                    <span
                      key={tech}
                      className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  Leveling up toward my goal of becoming a professional, full-stack software
                  developer.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((highlight, index) => (
                <AnimatedSection key={highlight.title} delay={0.2 + index * 0.08}>
                  <div className="glass glow-border group h-full rounded-2xl p-5">
                    <span className="bg-accent text-primary flex size-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                      <highlight.icon className="size-5" />
                    </span>
                    <h3 className="mt-4 font-semibold">{highlight.title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

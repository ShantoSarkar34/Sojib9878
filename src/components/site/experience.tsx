import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { AnimatedSection } from "@/components/shared/animated-section"
import { SpotlightCard } from "@/components/shared/spotlight-card"
import { Badge } from "@/components/ui/badge"
import type { Experience as ExperienceModel } from "@/generated/prisma/client"

function formatRange(start: Date, end: Date | null, current: boolean) {
  const startLabel = start.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  })
  if (current) return `${startLabel} — Present`
  if (!end) return startLabel
  const endLabel = end.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  return `${startLabel} — ${endLabel}`
}

export function Experience({ items }: { items: ExperienceModel[] }) {
  if (items.length === 0) return null

  return (
    <section id="experience" className="py-28">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="A timeline of my professional experience."
        />

        <div className="relative mx-auto mt-14 max-w-2xl">
          <div className="via-border absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-transparent to-transparent" />
          <div className="space-y-6">
            {items.map((item, index) => (
              <AnimatedSection
                key={item.id}
                delay={index * 0.1}
                className="relative pl-10"
              >
                <span className="bg-gradient-brand ring-background absolute top-6 left-0 size-4 rounded-full ring-4" />
                <SpotlightCard>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-semibold">{item.role}</h3>
                      <Badge variant="secondary" className="glass">
                        {formatRange(item.startDate, item.endDate, item.current)}
                      </Badge>
                    </div>
                    <p className="text-primary mt-1 text-sm font-medium">
                      {item.company}
                      {item.location ? ` · ${item.location}` : ""}
                    </p>
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                </SpotlightCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

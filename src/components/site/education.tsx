import { GraduationCap } from "lucide-react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { AnimatedSection } from "@/components/shared/animated-section"
import { SpotlightCard } from "@/components/shared/spotlight-card"
import type { Education as EducationModel } from "@/generated/prisma/client"

function formatRange(start: Date, end: Date | null) {
  const startLabel = start.getFullYear()
  const endLabel = end ? end.getFullYear() : "Present"
  return `${startLabel} — ${endLabel}`
}

export function Education({ items }: { items: EducationModel[] }) {
  if (items.length === 0) return null

  return (
    <section id="education" className="py-28">
      <Container>
        <SectionHeading
          eyebrow="Education"
          title="Academic background"
          description="My formal education and qualifications."
        />

        <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
          {items.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.1}>
              <SpotlightCard className="h-full">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="bg-accent text-primary flex size-10 items-center justify-center rounded-xl">
                      <GraduationCap className="size-5" />
                    </span>
                    <span className="text-muted-foreground text-xs font-medium">
                      {formatRange(item.startDate, item.endDate)}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{item.degree}</h3>
                  <p className="text-primary text-sm font-medium">
                    {item.institution}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                  {item.description && (
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </SpotlightCard>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  )
}

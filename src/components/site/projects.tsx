import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { AnimatedSection } from "@/components/shared/animated-section"
import { ProjectCard } from "@/components/site/project-card"
import { Button } from "@/components/ui/button"
import type { Project } from "@/generated/prisma/client"

export function Projects({
  items,
  totalCount,
}: {
  items: Project[]
  totalCount: number
}) {
  if (items.length === 0) return null

  const hasMore = totalCount > items.length

  return (
    <section id="projects" className="py-28">
      <Container>
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="A few projects I've built recently — hover to explore, click for the full story."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {hasMore && (
          <AnimatedSection className="mt-12 flex justify-center">
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/projects" />}
              className="glass group rounded-full px-7"
            >
              See all {totalCount} projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </AnimatedSection>
        )}
      </Container>
    </section>
  )
}

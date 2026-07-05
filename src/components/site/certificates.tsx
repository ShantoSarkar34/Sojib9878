import Image from "next/image"
import { Award, ExternalLink } from "lucide-react"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { AnimatedSection } from "@/components/shared/animated-section"
import { SpotlightCard } from "@/components/shared/spotlight-card"
import { Button } from "@/components/ui/button"
import type { Certificate } from "@/generated/prisma/client"

export function Certificates({ items }: { items: Certificate[] }) {
  if (items.length === 0) return null

  return (
    <section id="certificates" className="py-28">
      <Container>
        <SectionHeading
          eyebrow="Certificates"
          title="Certifications"
          description="Courses and certifications I've completed."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.1}>
              <SpotlightCard className="h-full">
                <div className="flex h-full flex-col gap-3 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="bg-accent flex size-11 shrink-0 items-center justify-center rounded-xl">
                      {item.imageUrl ? (
                        <div className="relative size-6">
                          <Image
                            src={item.imageUrl}
                            alt={item.issuer}
                            fill
                            className="object-contain"
                            sizes="24px"
                          />
                        </div>
                      ) : (
                        <Award className="text-accent-foreground size-5" />
                      )}
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {item.issueDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-muted-foreground text-sm">{item.issuer}</p>
                  {item.credentialUrl && (
                    <Button
                      variant="link"
                      className="mt-auto h-auto justify-start p-0"
                      nativeButton={false}
                      render={
                        <a
                          href={item.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                    >
                      View credential
                      <ExternalLink className="size-3.5" />
                    </Button>
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

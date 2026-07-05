import { AnimatedSection } from "@/components/shared/animated-section"

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <AnimatedSection className="mx-auto max-w-2xl text-center">
      <span className="glass text-primary mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase">
        <span className="bg-primary size-1.5 rounded-full" />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground mt-4 text-base leading-relaxed">
          {description}
        </p>
      )}
    </AnimatedSection>
  )
}

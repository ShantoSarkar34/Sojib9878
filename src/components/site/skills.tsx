"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { Marquee } from "@/components/shared/marquee"
import { cn } from "@/lib/utils"
import type { Skill } from "@/generated/prisma/client"

const categoryLabels: Record<string, string> = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  TOOLS: "Tools",
  OTHER: "Other",
}

function monogram(name: string) {
  if (name.length <= 3) return name.toUpperCase()
  const caps = name.replace(/[^A-Z]/g, "")
  if (caps.length >= 2) return caps.slice(0, 2)
  return name.slice(0, 2).toUpperCase()
}

export function Skills({ groups }: { groups: { category: string; skills: Skill[] }[] }) {
  const allSkills = useMemo(() => groups.flatMap((group) => group.skills), [groups])
  const categories = useMemo(() => groups.map((group) => group.category), [groups])
  const [filter, setFilter] = useState<string | null>(null)

  const visible = filter
    ? allSkills.filter((skill) => skill.category === filter)
    : allSkills

  if (allSkills.length === 0) return null

  return (
    <section id="skills" className="relative py-28">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="My tech toolkit"
          description="The languages, frameworks, and tools I use to design, build, and ship — plus what I'm sharpening right now."
        />

        {/* filter tabs */}
        <div className="mt-12 flex justify-center">
          <div className="glass flex flex-wrap justify-center gap-1 rounded-full p-1">
            <FilterChip active={filter === null} onClick={() => setFilter(null)}>
              All
            </FilterChip>
            {categories.map((cat) => (
              <FilterChip key={cat} active={filter === cat} onClick={() => setFilter(cat)}>
                {categoryLabels[cat] ?? cat}
              </FilterChip>
            ))}
          </div>
        </div>

        {/* skill grid */}
        <motion.div
          layout
          className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        >
          {visible.map((skill, index) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
              whileHover={{ y: -8 }}
              className="glass glow-border group relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl px-4 py-7 text-center"
            >
              <div className="relative flex size-16 items-center justify-center">
                <span className="bg-gradient-brand absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50" />
                {skill.iconUrl ? (
                  <span className="border-glass-border bg-background/50 relative flex size-16 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={skill.iconUrl}
                      alt={skill.name}
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </span>
                ) : (
                  <span className="bg-gradient-brand relative flex size-16 items-center justify-center rounded-2xl text-xl font-black text-white transition-transform duration-300 group-hover:scale-110">
                    {monogram(skill.name)}
                  </span>
                )}
              </div>
              <span className="group-hover:text-primary font-semibold transition-colors">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* seamless marquee of every skill */}
      <div className="relative mt-16">
        <Marquee>
          {allSkills.map((skill) => (
            <span
              key={`marquee-${skill.id}`}
              className="glass text-muted-foreground flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium"
            >
              {skill.iconUrl ? (
                <Image
                  src={skill.iconUrl}
                  alt=""
                  width={18}
                  height={18}
                  className="object-contain"
                />
              ) : (
                <span className="text-gradient-brand text-xs font-black">
                  {monogram(skill.name)}
                </span>
              )}
              {skill.name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
        active ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {active && (
        <motion.span
          layoutId="skill-filter-active"
          className="bg-accent ring-primary/25 absolute inset-0 -z-10 rounded-full ring-1"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      {children}
    </button>
  )
}

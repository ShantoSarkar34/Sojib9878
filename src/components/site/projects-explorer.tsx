"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

import { ProjectCard } from "@/components/site/project-card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { Project } from "@/generated/prisma/client"

export function ProjectsExplorer({ items }: { items: Project[] }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<string | null>(null)

  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category))),
    [items]
  )

  const filtered = items.filter((item) => {
    const matchesCategory = !category || item.category === category
    const matchesQuery =
      !query ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.summary.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="glass flex flex-wrap gap-1 rounded-full p-1">
          <FilterChip active={category === null} onClick={() => setCategory(null)}>
            All
          </FilterChip>
          {categories.map((cat) => (
            <FilterChip key={cat} active={category === cat} onClick={() => setCategory(cat)}>
              {cat}
            </FilterChip>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            placeholder="Search projects…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="glass rounded-full pl-9"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="text-muted-foreground py-16 text-center">
          No projects match your search.
        </p>
      )}
    </>
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
          layoutId="explorer-filter-active"
          className="bg-accent ring-primary/25 absolute inset-0 -z-10 rounded-full ring-1"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      {children}
    </button>
  )
}

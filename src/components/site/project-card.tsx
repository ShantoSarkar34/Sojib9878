"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

import { Tilt } from "@/components/shared/tilt"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/generated/prisma/client"

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
    >
      <Tilt className="h-full">
        <Link
          href={`/projects/${project.slug}`}
          className="glass glow-border group block h-full overflow-hidden rounded-2xl"
        >
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={project.coverImageUrl}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
            <div className="from-background/90 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-70" />
            <span className="glass absolute top-3 right-3 flex size-9 translate-y-2 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
          <div className="p-6">
            <Badge variant="secondary" className="glass mb-3">
              {project.category}
            </Badge>
            <h3 className="group-hover:text-primary text-lg font-semibold transition-colors">
              {project.name}
            </h3>
            <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
              {project.summary}
            </p>
            {project.techStack.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
      </Tilt>
    </motion.div>
  )
}

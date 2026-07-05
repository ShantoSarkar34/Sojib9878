"use client"

import { useRef, type ReactNode } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"

import { cn } from "@/lib/utils"

/**
 * Frosted-glass card with a cursor-following radial spotlight and a
 * gradient glow border that fades in on hover.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const ref = useRef<HTMLDivElement>(null)

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(event.clientX - rect.left)
    mouseY.set(event.clientY - rect.top)
  }

  const background = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px ${mouseY}px, var(--accent), transparent 70%)`

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "glass glow-border group relative overflow-hidden rounded-2xl",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

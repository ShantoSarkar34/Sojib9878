import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Infinite horizontal marquee. Renders its children twice so the loop is seamless.
 */
export function Marquee({
  children,
  className,
  reverse = false,
}: {
  children: ReactNode
  className?: string
  reverse?: boolean
}) {
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div
        className="animate-marquee flex shrink-0 items-center gap-4 pr-4 group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {children}
        {children}
      </div>
    </div>
  )
}

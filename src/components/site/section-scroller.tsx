"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

/**
 * Rendered on the homepage. Because section paths (/skills, /about, …) are
 * rewritten to the homepage, this reads the current path and scrolls to the
 * matching section — instantly on first load/share, smoothly on in-page nav.
 */
export function SectionScroller() {
  const pathname = usePathname()
  const firstRun = useRef(true)

  useEffect(() => {
    const id = pathname === "/" ? "" : pathname.replace(/^\//, "")

    if (!id) {
      if (firstRun.current) firstRun.current = false
      else window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const behavior: ScrollBehavior = firstRun.current ? "auto" : "smooth"
    firstRun.current = false

    // Wait a frame so the sections are laid out before scrolling.
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior, block: "start" })
    }, 60)
    return () => clearTimeout(timer)
  }, [pathname])

  return null
}

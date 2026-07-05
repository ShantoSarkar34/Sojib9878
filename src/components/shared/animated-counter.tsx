"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView } from "framer-motion"

export function AnimatedCounter({
  to,
  suffix = "",
  duration = 1.4,
}: {
  to: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [value, setValue] = useState(0)

  const decimals = Number.isInteger(to) ? 0 : 1

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Number(latest.toFixed(decimals))),
    })
    return () => controls.stop()
  }, [inView, to, duration, decimals])

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

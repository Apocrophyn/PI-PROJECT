"use client"

import { useEffect, useRef, type ReactNode } from "react"

// Restarts the letter shimmer each time the wrapped text scrolls into view.
export function InViewShimmer({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current!
    const io = new IntersectionObserver(([entry]) => el.toggleAttribute("data-live", entry.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return <div ref={ref} aria-hidden="true" className={`shimmer-on-view ${className ?? ""}`}>{children}</div>
}

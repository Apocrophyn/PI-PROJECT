"use client"

import { useEffect, useRef } from "react"

/** A hairline that fills as the article scrolls past, pinned under the header. */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current!
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update) }
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-px bg-white/[0.06]">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-gradient-to-r from-primary via-white to-secondary" />
    </div>
  )
}

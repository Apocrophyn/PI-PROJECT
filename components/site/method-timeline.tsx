"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Vertical method steps; a light line fills as the reader moves through them and each step ignites on arrival.
export function MethodTimeline({ steps }: { steps: { title: string; description: string }[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = ref.current!
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-step]"))
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fillRef.current!.style.transform = "scaleY(1)"
      items.forEach((el) => el.setAttribute("data-on", ""))
      return
    }
    const trigger = ScrollTrigger.create({
      trigger: list,
      start: "top 65%",
      end: "bottom 55%",
      onUpdate: (self) => {
        fillRef.current!.style.transform = `scaleY(${self.progress})`
        items.forEach((el, i) => el.toggleAttribute("data-on", self.progress >= i / items.length + 0.02 || self.progress === 1))
      },
    })
    return () => trigger.kill()
  }, [])

  return (
    <ol ref={ref} className="relative">
      <div aria-hidden="true" className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-white/10">
        <div ref={fillRef} className="h-full origin-top scale-y-0 bg-gradient-to-b from-primary via-white to-secondary shadow-[0_0_12px_rgba(120,221,234,0.6)]" />
      </div>
      {steps.map((step, index) => (
        <li key={step.title} data-step className="group relative grid grid-cols-[2.75rem_1fr] gap-6 py-8 md:gap-8 md:py-10">
          <span className="relative z-10 grid size-11 place-items-center rounded-full border border-white/15 bg-[#050708] text-xs font-bold text-white/45 transition-all duration-700 group-data-[on]:border-primary group-data-[on]:text-primary group-data-[on]:shadow-[0_0_24px_rgba(120,221,234,0.45)]">
            0{index + 1}
          </span>
          <div className="opacity-40 transition-opacity duration-700 group-data-[on]:opacity-100">
            <h3 className="font-display text-4xl tracking-[-0.03em] md:text-5xl">{step.title}</h3>
            <p className="mt-3 max-w-lg text-base leading-8 text-muted-foreground">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

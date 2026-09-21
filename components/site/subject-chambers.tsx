"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { subjectGroups } from "@/lib/site-data"

gsap.registerPlugin(ScrollTrigger)

const clamp01 = (x: number) => Math.max(0, Math.min(1, x))
const lin = (p: number, a: number, b: number) => clamp01((p - a) / (b - a))
const ease = (t: number) => 1 - Math.pow(1 - t, 3)

const EXPAND: [number, number] = [0.02, 0.24]
const SUBJECTS_START = 0.27
const FADE = 0.04
const WIPE = 0.07

// A contained image expands to full bleed, then the stage steps through each subject.
export function SubjectChambers() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const [reduced, setReduced] = useState(false)
  const count = subjectGroups.length

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true)
      return
    }
    const images = Array.from(imagesRef.current!.children) as HTMLElement[]
    const panels = Array.from(panelsRef.current!.children) as HTMLElement[]
    const railItems = Array.from(railRef.current!.querySelectorAll<HTMLElement>("[data-rail]"))
    const railFill = railRef.current!.querySelector<HTMLElement>("[data-rail-fill]")!
    const mobile = window.matchMedia("(max-width: 767px)").matches
    const span = (1 - SUBJECTS_START) / count
    const grade = frameRef.current!.querySelector<HTMLElement>("[data-grade]")!

    const render = (p: number) => {
      const e = ease(lin(p, ...EXPAND))
      const [top, side, bottom] = mobile ? [32, 5, 14] : [29, 24, 7]
      frameRef.current!.style.clipPath = `inset(${top * (1 - e)}% ${side * (1 - e)}% ${bottom * (1 - e)}% ${side * (1 - e)}% round ${28 - 28 * e}px)`
      grade.style.opacity = String(e)
      leftRef.current!.style.transform = `translate3d(0, ${-e * 12}vh, 0) scale(${1 - e * 0.06})`
      leftRef.current!.style.opacity = String(1 - lin(p, 0.03, 0.14))

      images.forEach((img, i) => {
        const start = SUBJECTS_START + i * span
        // Each subject wipes in over the previous one, led by a bright edge of light.
        const tIn = i === 0 ? 1 : lin(p, start - WIPE / 2, start + WIPE / 2)
        const wiped = ease(tIn)
        const local = lin(p, i === 0 ? 0 : start, Math.min(1, start + span))
        img.style.opacity = tIn > 0 ? "1" : "0"
        img.style.clipPath = `inset(0% ${((1 - wiped) * 100).toFixed(2)}% 0% 0%)`
        const inner = img.firstElementChild as HTMLElement
        inner.style.transform = `scale(${(1.12 - 0.07 * wiped - 0.05 * local).toFixed(3)}) translate3d(${(-1.5 + 3 * local).toFixed(2)}%, 0, 0)`
        const edge = img.querySelector<HTMLElement>("[data-edge]")!
        edge.style.left = `${(wiped * 100).toFixed(2)}%`
        edge.style.opacity = String(tIn > 0.004 && tIn < 0.996 ? 1 : 0)
      })

      panels.forEach((panel, i) => {
        const start = SUBJECTS_START + i * span
        const tIn = i === 0 ? lin(p, SUBJECTS_START - 0.03, SUBJECTS_START + 0.03) : lin(p, start - WIPE / 3, start + WIPE)
        const tOut = i === count - 1 ? 0 : lin(p, start + span - WIPE, start + span - WIPE / 3)
        const vis = Math.min(tIn, 1 - tOut)
        panel.style.opacity = String(vis)
        panel.style.visibility = vis < 0.01 ? "hidden" : "visible"
        panel.style.pointerEvents = vis > 0.6 ? "auto" : "none"
        // Lines rise from behind a mask, staggered, and lift back out as the subject leaves.
        const lines = Array.from(panel.querySelectorAll<HTMLElement>("[data-mask]"))
        lines.forEach((line, k) => {
          const lead = k * 0.12
          const enter = ease(clamp01((tIn - lead) / (1 - lead)))
          line.style.transform = `translate3d(0, ${((1 - enter) * 115 - tOut * 60).toFixed(2)}%, 0)`
        })
      })

      const active = Math.min(count - 1, Math.max(0, Math.floor((p - SUBJECTS_START) / span)))
      railItems.forEach((el, i) => el.toggleAttribute("data-active", p >= SUBJECTS_START - FADE && i === active))
      railFill.style.transform = `scaleY(${lin(p, SUBJECTS_START, 1)})`
      railRef.current!.style.opacity = String(lin(p, SUBJECTS_START - 0.04, SUBJECTS_START))
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${window.innerHeight * (mobile ? 3.4 : 4.2)}`,
      pin: stageRef.current,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => render(self.progress),
      onRefresh: (self) => render(self.progress),
    })
    render(trigger.progress)
    return () => trigger.kill()
  }, [count])

  if (reduced) {
    return (
      <section className="page-section bg-[#050708]">
        <div className="site-shell">
          <p className="eyebrow">Subject support</p>
          <h2 className="section-title mt-6 max-w-[12ch]">Precision, exactly where it matters.</h2>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {subjectGroups.map((s) => (
              <Link key={s.title} href="/services" className="group overflow-hidden rounded-2xl border border-white/10">
                <div className="relative aspect-[16/9]"><Image src={s.image} alt="" fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" /></div>
                <div className="p-6"><p className="text-xs font-bold text-primary">{s.number} · {s.levels}</p><h3 className="mt-3 font-display text-4xl">{s.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{s.detail}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative bg-[#050708]" aria-label="Subjects">
      <div ref={stageRef} className="relative h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex h-[30%] flex-col items-center justify-end pb-[2.5vh] text-center md:h-[27%]">
          <div ref={leftRef}>
            <p className="eyebrow justify-center">Four subjects · one way of thinking</p>
            <h2 className="mt-4 px-4 font-display text-[clamp(2.2rem,4.6vw,4.8rem)] leading-[0.95] tracking-[-0.045em] text-[#f0eee6]">
              Precision, <span className="italic text-primary">exactly</span> where it matters.
            </h2>
          </div>
        </div>

        <div ref={frameRef} className="absolute inset-0 z-10 overflow-hidden" style={{ clipPath: "inset(29% 24% 7% 24% round 28px)" }}>
          <div ref={imagesRef} className="absolute inset-0">
            {subjectGroups.map((s, i) => (
              <div key={s.title} className="absolute inset-0" style={{ opacity: i === 0 ? 1 : 0, clipPath: i === 0 ? undefined : "inset(0% 100% 0% 0%)" }}>
                <div className="absolute inset-0 will-change-transform">
                  <Image src={s.image} alt="" fill sizes="100vw" className="object-cover object-[70%_50%]" />
                </div>
                <span data-edge aria-hidden="true" className="absolute inset-y-0 -ml-px w-[3px] bg-gradient-to-b from-transparent via-white to-transparent opacity-0 shadow-[0_0_30px_8px_rgba(120,221,234,0.55)]" />
              </div>
            ))}
          </div>
          <div data-grade className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,8,0.9)_0%,rgba(5,7,8,0.55)_40%,transparent_70%)] opacity-0" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050708]/90 to-transparent md:hidden" />

          <div ref={panelsRef} className="absolute inset-0">
            {subjectGroups.map((s) => (
              <div key={s.title} className="invisible absolute inset-0 flex items-end pb-[14vh] opacity-0 md:items-center md:pb-0">
                <div className="site-shell">
                  <span className="block overflow-hidden pb-1"><span data-mask className="block text-[0.68rem] font-bold uppercase tracking-[0.2em] text-primary">{s.number} / 0{count} · {s.levels}</span></span>
                  <h3 className="mt-4 overflow-hidden pb-[0.1em]"><span data-mask className="block font-display text-[clamp(3.4rem,9vw,9.5rem)] leading-[0.86] tracking-[-0.05em] text-[#f0eee6]">{s.title}</span></h3>
                  <span className="mt-5 block max-w-md overflow-hidden pb-1"><span data-mask className="block text-base leading-8 text-[#c9d0d0] md:text-lg">{s.detail}</span></span>
                  <span className="mt-6 hidden overflow-hidden pb-1 md:block"><span data-mask className="flex max-w-lg flex-wrap gap-2">
                    {s.topics.map((t) => <span key={t} className="rounded-full border border-white/15 bg-black/30 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-white/75">{t}</span>)}
                  </span></span>
                  <span className="mt-8 block overflow-hidden pb-1"><span data-mask className="block">
                    <Link href={`/contact?subject=${encodeURIComponent(s.title)}#contact-form`} className="lg inline-flex h-12 items-center gap-2.5 rounded-full px-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em]">
                      Enquire about {s.title} <ArrowUpRight data-icon className="size-4" />
                    </Link>
                  </span></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={railRef} className="pointer-events-none absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 opacity-0 md:right-10 md:flex" aria-hidden="true">
          <div className="relative mr-5 w-px bg-white/15"><div data-rail-fill className="absolute inset-0 origin-top scale-y-0 bg-gradient-to-b from-primary to-secondary" /></div>
          <ul className="flex flex-col gap-5">
            {subjectGroups.map((s) => (
              <li key={s.title} data-rail className="text-[0.65rem] [text-shadow:0_1px_12px_rgba(0,0,0,0.9)] font-bold uppercase tracking-[0.18em] text-white/35 transition-colors duration-500 data-[active]:text-[#f0eee6]">
                {s.number} {s.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

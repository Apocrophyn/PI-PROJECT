"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { ShimmerText } from "@/components/site/shimmer-text"
import { Slab } from "@/components/site/motion-kit"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const VARIANTS = {
  panes: {
    desktop: { count: 122, dir: "/cinema/panes/d2/" },
    mobile: { count: 122, dir: "/cinema/panes/m/" },
    // The resting image is the one people sit on, so it is kept at full quality
    // rather than being borrowed from the scrub sequence.
    poster: "/cinema/panes/poster.webp",
    statement: "Confusion is usually just structure a student cannot see yet.",
    finale: "From confusion to clarity.",
    finaleAlign: "left" as const,
    label: "PI / Refraction study 03",
    endZoom: 0.04,
  },
  lens: {
    desktop: { count: 192, dir: "/cinema/hero/d/" },
    mobile: { count: 96, dir: "/cinema/hero/m/" },
    statement: "Most students don’t lack ability. They lack the explanation that fits the way they think.",
    finale: "Clarity changes the whole picture.",
    finaleAlign: "center" as const,
    label: "PI / Optical study 01",
    endZoom: 0.06,
  },
  chrome: {
    desktop: { count: 243, dir: "/cinema/chrome/d/" },
    mobile: { count: 122, dir: "/cinema/chrome/m/" },
    statement: "Before it clicks, an idea feels shapeless. The right explanation gives it form.",
    finale: "Understanding, made solid.",
    finaleAlign: "left" as const,
    label: "PI / Liquid study 02",
    endZoom: 0.03,
  },
}
export type HeroVariant = keyof typeof VARIANTS
const frameSrc = (dir: string, index: number) => `${dir}${String(index + 1).padStart(3, "0")}.webp`

// Storyboard, as fractions of the pinned scroll.
const T = {
  frames: [0.02, 0.8],
  copyOut: [0.07, 0.17],
  statementIn: [0.19, 0.24],
  statementLit: [0.23, 0.48],
  statementOut: [0.52, 0.57],
  cards: [0.58, 0.7],
  cardsOut: [0.77, 0.81],
  finaleIn: [0.83, 0.88],
  finaleLit: [0.84, 0.95],
} as const

const clamp01 = (x: number) => Math.max(0, Math.min(1, x))
const lin = (p: number, [a, b]: readonly [number, number]) => clamp01((p - a) / (b - a))

const CHAPTERS = [
  { title: "Notice", copy: "Find the precise point where an idea stopped making sense." },
  { title: "Explain", copy: "Rebuild it with a representation that makes the structure visible." },
  { title: "Transfer", copy: "Practise until the student can take it somewhere new, alone." },
]

function LitText({ text, className }: { text: string; className?: string }) {
  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="relative block">
        <span className="text-white/[0.16]">{text}</span>
        <span className="text-gradient absolute inset-0" style={{ textShadow: "0 0 28px rgba(120,221,234,0.18)" }}>
          {Array.from(text).map((ch, i) => (
            <span key={i} data-lit style={{ opacity: 0 }}>{ch}</span>
          ))}
        </span>
      </span>
    </p>
  )
}

function HeroCopy() {
  return (
    <>
      <p className="eyebrow opacity-0 [animation:letter-in_1s_var(--ease-out)_0.05s_both]">Mathematics &amp; science tutoring · KS3 to A-Level</p>
      <ShimmerText
        as="h1"
        intro
        introDelay={150}
        shineDelay={1900}
        className="mt-7 block max-w-[11ch] text-[clamp(3.1rem,6vw,6.6rem)] leading-[0.9] tracking-[-0.05em] [text-wrap:balance]"
        segments={["Difficult ideas. ", { text: "Beautifully", className: "italic", base: "#78ddea" }, " understood."]}
      />
      <p className="body-large mt-7 max-w-md text-[#c9d0d0] opacity-0 [animation:letter-in_1s_var(--ease-out)_0.7s_both]">
        Personalised tutoring that replaces memorising with real understanding. Online, and in person around Rotherham and Birmingham.
      </p>
      <div className="mt-9 flex flex-wrap gap-3 opacity-0 [animation:letter-in_1s_var(--ease-out)_0.85s_both]">
        <Button variant="ivory" size="lg" asChild><Link href="/contact">Find your tutor <ArrowUpRight data-icon /></Link></Button>
        <Button variant="glass" size="lg" asChild><Link href="/services">Explore subjects</Link></Button>
      </div>
    </>
  )
}

export function CinematicHero({ variant = "panes" }: { variant?: HeroVariant }) {
  const config = VARIANTS[variant]
  const POSTER = "poster" in config ? config.poster : frameSrc(config.desktop.dir, config.desktop.count - 1)
  const STATEMENT = config.statement
  const FINALE = config.finale
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const gradeRef = useRef<HTMLDivElement>(null)
  const shadeRef = useRef<HTMLDivElement>(null)
  const finaleShadeRef = useRef<HTMLDivElement>(null)
  const statementRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const finaleRef = useRef<HTMLDivElement>(null)
  const focusRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const cueRef = useRef<HTMLDivElement>(null)
  const posterRef = useRef<HTMLImageElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true)
      return
    }

    const section = sectionRef.current!
    const stage = stageRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const mobile = window.matchMedia("(max-width: 767px)").matches
    const seq = mobile ? config.mobile : config.desktop
    const images: HTMLImageElement[] = new Array(seq.count)
    const ready: boolean[] = new Array(seq.count).fill(false)
    let current = -1
    let wanted = 0
    let progress = 0
    let disposed = false

    const statementLetters = Array.from(statementRef.current!.querySelectorAll<HTMLElement>("[data-lit]"))
    const finaleLetters = Array.from(finaleRef.current!.querySelectorAll<HTMLElement>("[data-lit]"))
    const cards = Array.from(cardsRef.current!.children) as HTMLElement[]

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      canvas.width = Math.round(stage.clientWidth * dpr)
      canvas.height = Math.round(stage.clientHeight * dpr)
      current = -1
      draw(wanted)
    }

    const nearestReady = (index: number) => {
      for (let d = 0; d < seq.count; d++) {
        if (index - d >= 0 && ready[index - d]) return index - d
        if (index + d < seq.count && ready[index + d]) return index + d
      }
      return -1
    }

    function draw(index: number) {
      wanted = index
      const i = nearestReady(index)
      if (i < 0 || i === current) return
      current = i
      const img = images[i]
      const cw = canvas.width
      const ch = canvas.height
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const w = img.naturalWidth * scale
      const h = img.naturalHeight * scale
      // On narrow screens keep the instrument in view: it starts right of centre and ends centred.
      const focus = cw / ch < 1.2 ? 0.63 - 0.13 * clamp01(progress / 0.8) : 0.44 + 0.06 * clamp01(progress / 0.8)
      const x = Math.min(0, Math.max(cw - w, cw / 2 - w * focus))
      ctx.drawImage(img, x, (ch - h) / 2, w, h)
    }

    const load = (index: number) =>
      new Promise<void>((resolve) => {
        const img = new Image()
        img.decoding = "async"
        img.fetchPriority = "low"
        img.src = frameSrc(seq.dir, index)
        images[index] = img
        img.onload = () => {
          ready[index] = true
          if (!disposed && (current < 0 || Math.abs(index - wanted) < Math.abs(current - wanted))) {
            current = -1
            draw(wanted)
          }
          resolve()
        }
        img.onerror = () => resolve()
      })

    const queue = Array.from({ length: seq.count }, (_, i) => i)
    const worker = async () => {
      while (queue.length && !disposed) await load(queue.shift()!)
    }
    // Hold the sequence back until the page has painted and settled, so it never
    // competes with the fonts, the poster or the rest of the first screen.
    const startLoading = () => {
      if (disposed) return
      load(0).then(() => {
        queue.shift()
        for (let n = 0; n < 3; n++) worker()
      })
    }
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(startLoading, { timeout: 2500 })
      : window.setTimeout(startLoading, 900)

    const render = (p: number) => {
      progress = p
      const f = lin(p, T.frames)
      draw(Math.round(f * (seq.count - 1)))
      // At rest the resolved final frame is shown; the first flick of scroll dissolves into the sequence.
      const handoff = lin(p, [0.002, 0.045])
      posterRef.current!.style.opacity = String(1 - handoff)
      canvas.style.opacity = String(ready[0] || current >= 0 ? handoff : 0)
      canvas.style.transform = `scale(${1 + config.endZoom * lin(p, [0.8, 1])})`

      const out = lin(p, T.copyOut)
      const copy = copyRef.current!
      copy.style.opacity = String(1 - out)
      copy.style.transform = `translate3d(0, ${-70 * out}px, 0)`
      copy.style.filter = out > 0 ? `blur(${out * 10}px)` : ""
      copy.style.pointerEvents = out > 0.5 ? "none" : ""
      cueRef.current!.style.opacity = String(1 - lin(p, [0, 0.05]))
      gradeRef.current!.style.opacity = String(1 - 0.75 * lin(p, [0.08, 0.3]))

      const statementVisible = Math.min(lin(p, T.statementIn), 1 - lin(p, T.statementOut))
      statementRef.current!.style.opacity = String(statementVisible)
      statementRef.current!.style.transform = `translate3d(0, ${(1 - lin(p, T.statementIn)) * 40 - lin(p, T.statementOut) * 40}px, 0)`
      const lit = lin(p, T.statementLit) * statementLetters.length
      statementLetters.forEach((el, i) => { el.style.opacity = String(clamp01(lit - i)) })

      const cardsOut = 1 - lin(p, T.cardsOut)
      cards.forEach((el, i) => {
        const slot = T.cards[0] + (i / cards.length) * (T.cards[1] - T.cards[0])
        const o = Math.min(clamp01((p - slot) / 0.05), cardsOut)
        el.style.opacity = String(o)
        el.style.transform = `translate3d(0, ${(1 - o) * 48}px, 0)`
      })

      const finale = lin(p, T.finaleIn)
      finaleRef.current!.style.opacity = String(finale)
      finaleRef.current!.style.transform = `translate3d(0, ${(1 - finale) * 36}px, 0) scale(${0.96 + 0.04 * finale})`
      const finaleLit = lin(p, T.finaleLit) * finaleLetters.length
      finaleLetters.forEach((el, i) => { el.style.opacity = String(clamp01(finaleLit - i)) })

      shadeRef.current!.style.opacity = String(Math.max(statementVisible, 0.7 * Math.max(...cards.map((c) => Number(c.style.opacity)))) * (1 - finale))
      finaleShadeRef.current!.style.opacity = String(finale)
      focusRef.current!.textContent = String(Math.round(f * 100)).padStart(3, "0")
      barRef.current!.style.transform = `scaleX(${p})`
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${window.innerHeight * (mobile ? 3.4 : 4.6)}`,
      pin: stage,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => render(self.progress),
      onRefresh: (self) => render(self.progress),
    })

    size()
    render(trigger.progress)
    const ro = new ResizeObserver(size)
    ro.observe(stage)

    return () => {
      disposed = true
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number)
      else window.clearTimeout(idle as number)
      ro.disconnect()
      trigger.kill()
    }
  }, [config])

  if (reduced) {
    return (
      <section className="relative border-b border-white/10 bg-[#050708]">
        <div className="relative min-h-[100svh] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={POSTER} alt="" className="absolute inset-0 size-full object-cover object-[63%_50%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050708] via-[#050708]/70 to-transparent" />
          <div className="site-shell relative flex min-h-[100svh] flex-col justify-center pt-[var(--header-h)]"><HeroCopy /></div>
        </div>
        <div className="site-shell py-24">
          <p className="max-w-4xl font-display text-[clamp(2rem,4.4vw,4.2rem)] leading-[1.05] tracking-[-0.03em] text-[#f0eee6]">{STATEMENT}</p>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {CHAPTERS.map((c, i) => (
              <div key={c.title} className="glass-panel rounded-2xl p-7"><p className="text-xs font-bold text-primary">0{i + 1}</p><h3 className="mt-6 font-display text-3xl">{c.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{c.copy}</p></div>
            ))}
          </div>
          <p className="mt-24 max-w-[10ch] font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.05em] text-[#f0eee6]">{FINALE}</p>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative bg-[#050708]" aria-label="Introduction">
      <div ref={stageRef} className="relative h-[100svh] w-full overflow-hidden bg-[#050708]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={posterRef} src={POSTER} alt="" fetchPriority="high" className="absolute inset-0 size-full object-cover object-[63%_50%] md:object-[20%_50%]" />
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full origin-center opacity-0" />

        <div ref={gradeRef} className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,8,0.94)_0%,rgba(5,7,8,0.8)_48%,rgba(5,7,8,0.35)_72%,transparent_88%)] md:bg-[linear-gradient(90deg,rgba(5,7,8,0.92)_0%,rgba(5,7,8,0.6)_36%,transparent_62%)]" />
        <div ref={shadeRef} className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(5,7,8,0.95)_0%,rgba(5,7,8,0.55)_55%,rgba(5,7,8,0.35)_100%)] opacity-0 md:bg-[linear-gradient(90deg,rgba(5,7,8,0.94)_0%,rgba(5,7,8,0.7)_45%,rgba(5,7,8,0.3)_100%)]" />
        <div ref={finaleShadeRef} className={cn("pointer-events-none absolute inset-0 opacity-0", config.finaleAlign === "center" ? "bg-[radial-gradient(ellipse_at_center,rgba(5,7,8,0.82)_0%,rgba(5,7,8,0.55)_60%,rgba(5,7,8,0.8)_100%)]" : "bg-[linear-gradient(180deg,rgba(5,7,8,0.85)_0%,rgba(5,7,8,0.2)_55%,transparent_80%)] md:bg-[linear-gradient(90deg,rgba(5,7,8,0.9)_0%,rgba(5,7,8,0.5)_40%,transparent_65%)]")} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050708] to-transparent" />

        <div ref={copyRef} className="site-shell relative z-10 flex h-full flex-col justify-start pt-[calc(var(--header-h)+7vh)] md:justify-center md:pt-[var(--header-h)]">
          <div className="max-w-[46rem]"><HeroCopy /></div>
        </div>

        <div ref={statementRef} className="pointer-events-none absolute inset-0 z-10 flex items-end pb-[16vh] opacity-0 md:items-center md:pb-0">
          <div className="site-shell">
            <p className="eyebrow">Why PI Tutors</p>
            <LitText text={STATEMENT} className="mt-6 max-w-[22ch] font-display text-[clamp(2.2rem,5.2vw,5.4rem)] leading-[1.02] tracking-[-0.035em]" />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 flex items-end pb-[12vh] md:pb-[14vh]">
          <div className="site-shell">
            <p className="sr-only">How a PI Tutors session works</p>
            <div ref={cardsRef} className="grid gap-3 md:grid-cols-3 md:gap-4">
              {CHAPTERS.map((c, i) => (
                <div key={c.title} className="opacity-0">
                  <Slab radius={18} depth={7} faceClassName="p-5 md:p-7">
                    <div className="flex items-center justify-between"><span className="text-[0.65rem] font-bold tracking-[0.16em] text-primary">0{i + 1}</span><span className="h-px w-10 bg-gradient-to-r from-primary to-secondary" /></div>
                    <h3 className="mt-3 font-display text-2xl md:mt-10 md:text-[2.6rem]">{c.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#d7dcdc] md:mt-3 md:text-base md:leading-7">{c.copy}</p>
                  </Slab>
                </div>
              ))}
            </div>
          </div>
        </div>

        {config.finaleAlign === "center" ? (
          <div ref={finaleRef} className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0">
            <LitText text={FINALE} className="mx-auto max-w-[11ch] px-4 text-center font-display text-[clamp(3.2rem,9vw,9rem)] leading-[0.9] tracking-[-0.05em] [filter:drop-shadow(0_4px_30px_rgba(0,0,0,0.8))]" />
          </div>
        ) : (
          <div ref={finaleRef} className="pointer-events-none absolute inset-0 z-10 flex items-start pt-[calc(var(--header-h)+6vh)] opacity-0 md:items-center md:pt-0">
            <div className="site-shell">
              <p className="eyebrow">π · 3.14159…</p>
              <LitText text={FINALE} className="mt-6 max-w-[9ch] font-display text-[clamp(3rem,5.8vw,6.2rem)] leading-[0.9] tracking-[-0.05em] [filter:drop-shadow(0_4px_30px_rgba(0,0,0,0.8))]" />
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
          <div className="site-shell flex items-center justify-between gap-6 pb-5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/55">
            <span className="hidden md:inline">{config.label}</span>
            <div ref={cueRef} className="flex items-center gap-3">
              <span className="relative block h-8 w-px overflow-hidden bg-white/15"><span className="absolute inset-x-0 top-0 h-3 animate-[scroll-cue_1.8s_var(--ease-out)_infinite] bg-primary" /></span>
              Scroll to focus
            </div>
            <span>Focus <span ref={focusRef} className="tabular-nums text-primary">000</span></span>
          </div>
          <div className="h-px w-full bg-white/10"><div ref={barRef} className="h-full origin-left scale-x-0 bg-gradient-to-r from-primary via-white to-secondary" /></div>
        </div>
      </div>
    </section>
  )
}

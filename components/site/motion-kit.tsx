"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const clamp01 = (x: number) => Math.max(0, Math.min(1, x))
const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** An image that wipes open from the bottom when it enters, then drifts with scroll. */
export function ClipImage({ src, alt, className, imageClassName, sizes = "100vw", priority, parallax = 10 }: { src: string; alt: string; className?: string; imageClassName?: string; sizes?: string; priority?: boolean; parallax?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current!
    const inner = innerRef.current!
    if (prefersReduced()) {
      el.style.clipPath = "none"
      return
    }
    const reveal = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0% round 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 1.5, ease: "expo.out" })
        gsap.fromTo(inner, { scale: 1.22 }, { scale: 1.08, duration: 1.9, ease: "expo.out" })
      },
    })
    const drift = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => { inner.style.translate = `0 ${(self.progress - 0.5) * parallax * 2}%` },
    })
    return () => { reveal.kill(); drift.kill() }
  }, [parallax])

  return (
    <div ref={ref} className={cn("relative overflow-hidden rounded-3xl", className)} style={{ clipPath: "inset(100% 0% 0% 0% round 24px)" }}>
      <div ref={innerRef} className="absolute inset-0 scale-[1.08]">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", imageClassName)} />
      </div>
    </div>
  )
}

/** A statement whose letters light up, one by one, as it scrolls through the viewport. */
export function ScrollLit({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const letters = Array.from(ref.current!.querySelectorAll<HTMLElement>("[data-lit]"))
    if (prefersReduced()) {
      letters.forEach((el) => { el.style.opacity = "1" })
      return
    }
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 82%",
      end: "bottom 42%",
      onUpdate: (self) => {
        const lit = self.progress * letters.length * 1.05
        letters.forEach((el, i) => { el.style.opacity = String(clamp01(lit - i)) })
      },
    })
    return () => trigger.kill()
  }, [])

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="relative block">
        <span className="text-white/[0.14]">{text}</span>
        <span className="text-gradient absolute inset-0">
          {Array.from(text).map((ch, i) => <span key={i} data-lit style={{ opacity: 0 }}>{ch}</span>)}
        </span>
      </span>
    </p>
  )
}

/** Card with a cursor-following spotlight and edge light. */
export function SpotCard({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={cn("spot-card", className)}
      style={style}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty("--sx", `${event.clientX - rect.left}px`)
        event.currentTarget.style.setProperty("--sy", `${event.clientY - rect.top}px`)
      }}
    >
      {children}
    </div>
  )
}

/** Thick liquid-glass card with scooped corners, a lit rim, visible slab thickness and a cursor spotlight. */
export function Slab({ children, className, faceClassName, radius = 18, depth = 16, rail = 13, lift = true }: { children: ReactNode; className?: string; faceClassName?: string; radius?: number; depth?: number; rail?: number; lift?: boolean }) {
  return (
    <div
      data-lift={lift ? "" : undefined}
      className={cn("slab", className)}
      style={{ "--r": `${radius}px`, "--t": `${depth}px`, "--rail": `${rail}px` } as CSSProperties}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty("--sx", `${event.clientX - rect.left}px`)
        event.currentTarget.style.setProperty("--sy", `${event.clientY - rect.top}px`)
      }}
    >
      <div aria-hidden="true" className="slab-edge slab-mask" />
      <div aria-hidden="true" className="slab-shell slab-mask">
        <span className="slab-rail slab-rail-l" />
        <span className="slab-rail slab-rail-r" />
      </div>
      <div className={cn("slab-face", faceClassName)}>{children}</div>
    </div>
  )
}

/** Counts up to a value once it is in view. */
export function CountUp({ to, prefix = "", suffix = "", className }: { to: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(to)

  useEffect(() => {
    if (prefersReduced()) return
    setValue(0)
    const state = { v: 0 }
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 90%",
      once: true,
      onEnter: () => gsap.to(state, { v: to, duration: 1.6, ease: "expo.out", onUpdate: () => setValue(Math.round(state.v)) }),
    })
    return () => trigger.kill()
  }, [to])

  return <span ref={ref} className={cn("tabular-nums", className)}>{prefix}{value}{suffix}</span>
}

/** Infinite horizontal band of items. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = [...items, ...items]
  return (
    <div className={cn("marquee-wrap relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]", className)}>
      <div className="marquee" aria-hidden="true">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 pr-10 font-display text-[clamp(2rem,4.4vw,4.2rem)] italic tracking-[-0.03em] text-white/[0.8]">
            {item}
            <span className="not-italic text-[0.5em] text-primary">π</span>
          </span>
        ))}
      </div>
      <p className="sr-only">{items.join(", ")}</p>
    </div>
  )
}

/** A slow, precise instrument dial — the recurring motion graphic of the site. */
export function OrbitDial({ className, label = "π" }: { className?: string; label?: string }) {
  const ticks = Array.from({ length: 120 })
  return (
    <div className={cn("relative aspect-square", className)} aria-hidden="true">
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id="dial-arc" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#78ddea" />
            <stop offset="0.6" stopColor="#ffffff" />
            <stop offset="1" stopColor="#f2ad4d" />
          </linearGradient>
          <radialGradient id="dial-core">
            <stop offset="0" stopColor="rgba(120,221,234,0.22)" />
            <stop offset="1" stopColor="rgba(120,221,234,0)" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="150" fill="url(#dial-core)" />
        <g className="origin-center animate-[spin_90s_linear_infinite]" style={{ transformBox: "fill-box" }}>
          {ticks.map((_, i) => {
            const long = i % 10 === 0
            const a = (i / ticks.length) * Math.PI * 2
            const r1 = 190
            const r2 = long ? 176 : 184
            const at = (r: number, fn: (x: number) => number) => (200 + fn(a) * r).toFixed(2)
            return <line key={i} x1={at(r1, Math.cos)} y1={at(r1, Math.sin)} x2={at(r2, Math.cos)} y2={at(r2, Math.sin)} stroke={long ? "rgba(240,238,230,0.55)" : "rgba(240,238,230,0.18)"} strokeWidth={long ? 1.2 : 0.8} />
          })}
        </g>
        <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(255,255,255,0.08)" />
        <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 6" className="origin-center animate-[spin_60s_linear_infinite_reverse]" style={{ transformBox: "fill-box" }} />
        <circle cx="200" cy="200" r="160" fill="none" stroke="url(#dial-arc)" strokeWidth="1.6" strokeLinecap="round" pathLength={1} strokeDasharray="0.28 0.72" className="dial-sweep origin-center" style={{ transformBox: "fill-box" }} />
        <g className="origin-center animate-[spin_24s_linear_infinite]" style={{ transformBox: "fill-box" }}>
          <circle cx="200" cy="80" r="3.5" fill="#f2ad4d" />
          <circle cx="200" cy="80" r="10" fill="none" stroke="rgba(242,173,77,0.35)" />
        </g>
        <g className="origin-center animate-[spin_38s_linear_infinite_reverse]" style={{ transformBox: "fill-box" }}>
          <circle cx="360" cy="200" r="2.5" fill="#78ddea" />
        </g>
        <g className="origin-center animate-[spin_46s_linear_infinite]" style={{ transformBox: "fill-box" }}>
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (i / 36) * Math.PI * 2
            return <circle key={i} cx={(200 + Math.cos(a) * 140).toFixed(2)} cy={(200 + Math.sin(a) * 140).toFixed(2)} r={i % 9 === 0 ? 1.8 : 0.9} fill={i % 9 === 0 ? "#78ddea" : "rgba(240,238,230,0.35)"} />
          })}
        </g>
        {[["0", 352, 204], ["π/2", 200, 44], ["π", 44, 204], ["3π/2", 200, 364]].map(([t, x, y]) => (
          <text key={t} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontStyle="italic" fill="rgba(240,238,230,0.45)" fontFamily="var(--font-display), serif">{t}</text>
        ))}
        <line x1="20" y1="200" x2="380" y2="200" stroke="url(#dial-arc)" strokeOpacity="0.55" strokeWidth="0.8" />
        <line x1="200" y1="20" x2="200" y2="380" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-[clamp(3rem,9vw,7rem)] italic leading-none text-[#f0eee6] drop-shadow-[0_0_30px_rgba(120,221,234,0.35)]">{label}</span>
      </div>
    </div>
  )
}

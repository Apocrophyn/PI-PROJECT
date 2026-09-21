"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const TAU = Math.PI * 2
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** A radius sweeps the unit circle while its height is projected out into a travelling sine wave. */
export function UnitCircleWave({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current!
    const q = <T extends Element>(s: string) => svg.querySelector(s) as T
    const radius = q<SVGLineElement>("[data-radius]")
    const dot = q<SVGCircleElement>("[data-dot]")
    const proj = q<SVGLineElement>("[data-proj]")
    const drop = q<SVGLineElement>("[data-drop]")
    const wave = q<SVGPathElement>("[data-wave]")
    const head = q<SVGCircleElement>("[data-head]")
    const arc = q<SVGPathElement>("[data-arc]")
    const readout = q<SVGTextElement>("[data-readout]")
    const cx = 150, cy = 200, r = 105, x0 = 300, len = 330

    const draw = (t: number) => {
      const th = (t * 0.55) % TAU
      const px = cx + Math.cos(th) * r
      const py = cy - Math.sin(th) * r
      radius.setAttribute("x2", px.toFixed(2)); radius.setAttribute("y2", py.toFixed(2))
      dot.setAttribute("cx", px.toFixed(2)); dot.setAttribute("cy", py.toFixed(2))
      proj.setAttribute("x1", px.toFixed(2)); proj.setAttribute("y1", py.toFixed(2)); proj.setAttribute("y2", py.toFixed(2))
      drop.setAttribute("x1", px.toFixed(2)); drop.setAttribute("x2", px.toFixed(2)); drop.setAttribute("y1", py.toFixed(2))
      head.setAttribute("cy", py.toFixed(2))
      let d = ""
      for (let i = 0; i <= 120; i++) {
        const k = i / 120
        const y = cy - Math.sin(th - k * TAU) * r
        d += `${i ? "L" : "M"}${(x0 + k * len).toFixed(1)} ${y.toFixed(1)}`
      }
      wave.setAttribute("d", d)
      const ax = cx + Math.cos(th) * 34, ay = cy - Math.sin(th) * 34
      arc.setAttribute("d", `M${cx + 34} ${cy} A34 34 0 ${th > Math.PI ? 1 : 0} 0 ${ax.toFixed(2)} ${ay.toFixed(2)}`)
      readout.textContent = `sin θ = ${Math.sin(th).toFixed(3)}`
    }

    if (reducedMotion()) { draw(1.1); return }
    let raf = 0
    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(svg)
    const start = performance.now()
    const loop = (now: number) => { if (visible) draw((now - start) / 1000); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [])

  return (
    <svg ref={svgRef} viewBox="0 0 660 400" className={cn("w-full overflow-visible", className)} aria-hidden="true">
      <defs>
        <linearGradient id="ucw-wave" x1="0" x2="1">
          <stop offset="0" stopColor="#f0eee6" />
          <stop offset="0.35" stopColor="#78ddea" />
          <stop offset="1" stopColor="#78ddea" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="20" y1="200" x2="640" y2="200" stroke="rgba(255,255,255,0.12)" />
      <line x1="150" y1="70" x2="150" y2="330" stroke="rgba(255,255,255,0.08)" />
      <line x1="300" y1="80" x2="300" y2="320" stroke="rgba(255,255,255,0.08)" />
      {[-1, 1].map((k) => <line key={k} x1="300" x2="630" y1={200 - k * 105} y2={200 - k * 105} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 6" />)}
      <circle cx="150" cy="200" r="105" fill="rgba(120,221,234,0.03)" stroke="rgba(240,238,230,0.35)" strokeWidth="1.2" />
      <path data-arc fill="none" stroke="#f2ad4d" strokeWidth="1.4" />
      <line data-drop x1="0" y1="0" x2="0" y2="200" stroke="rgba(242,173,77,0.5)" strokeDasharray="2 4" />
      <line data-radius x1="150" y1="200" x2="255" y2="200" stroke="#f0eee6" strokeWidth="1.6" />
      <line data-proj x1="0" y1="0" x2="300" y2="0" stroke="rgba(120,221,234,0.55)" strokeDasharray="3 5" />
      <path data-wave fill="none" stroke="url(#ucw-wave)" strokeWidth="2.2" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px rgba(120,221,234,0.6))" }} />
      <circle data-head cx="300" cy="200" r="5" fill="#78ddea" />
      <circle data-dot cx="255" cy="200" r="6" fill="#f0eee6" style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))" }} />
      <circle cx="150" cy="200" r="3" fill="#f0eee6" />
      <text x="190" y="190" fill="#f2ad4d" fontSize="15" fontStyle="italic" fontFamily="var(--font-display), serif">θ</text>
      <text data-readout x="300" y="365" fill="rgba(240,238,230,0.6)" fontSize="13" letterSpacing="1.5" fontFamily="var(--font-sans), sans-serif">sin θ = 0.000</text>
      <text x="630" y="190" textAnchor="end" fill="rgba(240,238,230,0.45)" fontSize="13" fontStyle="italic" fontFamily="var(--font-display), serif">2π</text>
    </svg>
  )
}

/** Scroll-scrubbed: a circle of diameter 1 rolls one full turn and lays its circumference flat — exactly π. */
export function UnrollingCircle({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current!
    const q = <T extends Element>(s: string) => svg.querySelector(s) as T
    const wheel = q<SVGGElement>("[data-wheel]")
    const remain = q<SVGPathElement>("[data-remain]")
    const laid = q<SVGLineElement>("[data-laid]")
    const cycloid = q<SVGPathElement>("[data-cycloid]")
    const marker = q<SVGCircleElement>("[data-marker]")
    const counter = q<SVGTextElement>("[data-counter]")
    const piTag = q<SVGGElement>("[data-pitag]")
    const x0 = 80, ground = 330, r = 125, cy = ground - r

    const pt = (cx: number, phi: number) => [cx + r * Math.cos(phi), cy - r * Math.sin(phi)] as const

    const draw = (p: number) => {
      const th = p * TAU
      const cx = x0 + r * th
      wheel.setAttribute("transform", `translate(${cx.toFixed(2)} 0)`)
      laid.setAttribute("x2", cx.toFixed(2))
      // Rim not yet laid down runs from the contact point (−π/2) round to the marker.
      const a0 = -Math.PI / 2, a1 = 1.5 * Math.PI - th
      if (a1 - a0 > 0.001) {
        const [sx, sy] = pt(cx, a0), [ex, ey] = pt(cx, a1)
        remain.setAttribute("d", `M${sx.toFixed(2)} ${sy.toFixed(2)} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 0 ${ex.toFixed(2)} ${ey.toFixed(2)}`)
      } else remain.setAttribute("d", "")
      const [mx, my] = pt(cx, a1)
      marker.setAttribute("cx", mx.toFixed(2)); marker.setAttribute("cy", my.toFixed(2))
      let d = ""
      const steps = Math.max(2, Math.round(160 * p))
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * th
        d += `${i ? "L" : "M"}${(x0 + r * (t - Math.sin(t))).toFixed(1)} ${(ground - r * (1 - Math.cos(t))).toFixed(1)}`
      }
      cycloid.setAttribute("d", d)
      counter.textContent = (p * Math.PI).toFixed(5)
      piTag.style.opacity = String(Math.max(0, (p - 0.94) / 0.06))
    }

    if (reducedMotion()) { draw(1); return }
    draw(0)
    const trigger = ScrollTrigger.create({
      trigger: svg,
      start: "top 78%",
      end: "bottom 38%",
      onUpdate: (self) => draw(self.progress),
    })
    return () => trigger.kill()
  }, [])

  const unit = 125 * 2
  return (
    <svg ref={svgRef} viewBox="0 0 1000 420" className={cn("w-full", className)} aria-labelledby="unroll-title">
      <title id="unroll-title">A circle with diameter 1 rolls one full turn and travels a distance of exactly pi, about 3.14159.</title>
      <defs>
        <linearGradient id="unroll-laid" gradientUnits="userSpaceOnUse" x1="80" x2="866" y1="330" y2="330">
          <stop offset="0" stopColor="#78ddea" />
          <stop offset="0.7" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f2ad4d" />
        </linearGradient>
      </defs>
      <line x1="40" y1="330" x2="960" y2="330" stroke="rgba(255,255,255,0.14)" />
      {[0, 1, 2, 3].map((n) => (
        <g key={n}>
          <line x1={80 + n * unit} x2={80 + n * unit} y1="330" y2="342" stroke="rgba(240,238,230,0.45)" />
          <text x={80 + n * unit} y="366" textAnchor="middle" fill="rgba(240,238,230,0.5)" fontSize="15" fontFamily="var(--font-sans), sans-serif">{n}</text>
        </g>
      ))}
      <line data-laid x1="80" y1="330" x2="80" y2="330" stroke="url(#unroll-laid)" strokeWidth="4" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 8px rgba(120,221,234,0.7))" }} />
      <path data-cycloid fill="none" stroke="rgba(242,173,77,0.75)" strokeWidth="1.5" strokeDasharray="4 6" />
      <g data-wheel>
        <circle cx="0" cy="205" r="125" fill="rgba(120,221,234,0.035)" stroke="rgba(240,238,230,0.12)" />
        <line x1="-125" x2="125" y1="205" y2="205" stroke="rgba(240,238,230,0.35)" strokeDasharray="3 5" />
        <text x="0" y="195" textAnchor="middle" fill="rgba(240,238,230,0.6)" fontSize="14" fontStyle="italic" fontFamily="var(--font-display), serif">d = 1</text>
        <circle cx="0" cy="205" r="3" fill="#f0eee6" />
      </g>
      <path data-remain fill="none" stroke="#78ddea" strokeWidth="3" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px rgba(120,221,234,0.6))" }} />
      <circle data-marker r="7" fill="#f2ad4d" style={{ filter: "drop-shadow(0 0 10px rgba(242,173,77,0.9))" }} />
      <g data-pitag style={{ opacity: 0 }}>
        <line x1={80 + Math.PI * 250} x2={80 + Math.PI * 250} y1="300" y2="345" stroke="#f2ad4d" strokeWidth="1.5" />
        <text x={80 + Math.PI * 250} y="292" textAnchor="middle" fill="#f2ad4d" fontSize="30" fontStyle="italic" fontFamily="var(--font-display), serif">π</text>
      </g>
      <text x="40" y="60" fill="rgba(240,238,230,0.45)" fontSize="12" letterSpacing="3" fontFamily="var(--font-sans), sans-serif">DISTANCE TRAVELLED</text>
      <text data-counter x="40" y="108" fill="#f0eee6" fontSize="44" fontFamily="var(--font-display), serif">0.00000</text>
    </svg>
  )
}

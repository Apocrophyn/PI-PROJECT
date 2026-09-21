"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const CYAN = "120, 221, 234"
const AMBER = "242, 173, 77"

type Ring = { x: number; y: number; t: number; colour: string }

/**
 * The contact page as an instrument: a question leaves the student, travels the channel
 * and comes back answered. The trace is noisy on the way down and settles on the way up.
 */
export function ContactSignal({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let w = 0
    let h = 0
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      w = host.clientWidth
      h = host.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)

    const rings: Ring[] = []
    let lastLeg = -1

    // The channel bends on the way down and runs true on the way back.
    const channelX = (v: number, t: number, settle: number) => {
      const envelope = Math.sin(Math.PI * Math.min(1, Math.max(0, v)))
      const noise =
        Math.sin(v * 21 + t * 2.1) * 0.55 +
        Math.sin(v * 37 - t * 1.4) * 0.3 +
        Math.sin(v * 9 + t * 0.9) * 0.9
      return w * 0.5 + noise * envelope * w * 0.14 * (1 - settle * 0.88)
    }

    const draw = (time: number) => {
      const t = time / 1000
      const top = h * 0.15
      const bottom = h * 0.85
      const span = bottom - top

      // 0 to 1 travelling down, 1 to 2 travelling back up.
      const cycle = (t / 4.4) % 2
      const down = cycle < 1
      const raw = down ? cycle : cycle - 1
      const eased = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2
      const head = down ? eased : 1 - eased
      const settle = down ? 0 : 1

      const leg = down ? 0 : 1
      if (leg !== lastLeg) {
        if (lastLeg !== -1) rings.push({ x: w * 0.5, y: down ? top : bottom, t, colour: down ? AMBER : CYAN })
        lastLeg = leg
      }

      ctx.clearRect(0, 0, w, h)
      const colourAhead = down ? CYAN : AMBER

      // Graph rules, so the trace is read against something.
      ctx.strokeStyle = "rgba(240,238,230,0.045)"
      ctx.lineWidth = 1
      for (let i = 0; i <= 10; i++) {
        const y = top + (span * i) / 10
        ctx.beginPath()
        ctx.moveTo(w * 0.1, y)
        ctx.lineTo(w * 0.9, y)
        ctx.stroke()
      }

      // Ghosts of the last few passes.
      for (let g = 1; g <= 3; g++) {
        ctx.beginPath()
        for (let i = 0; i <= 90; i++) {
          const v = i / 90
          const y = top + span * v
          const x = channelX(v, t - g * 0.55, settle)
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(${colourAhead},${0.09 / g})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Instrument scale down the left edge.
      ctx.lineWidth = 1
      for (let i = 0; i <= 26; i++) {
        const y = top + (span * i) / 26
        const major = i % 5 === 0
        ctx.strokeStyle = `rgba(240,238,230,${major ? 0.22 : 0.09})`
        ctx.beginPath()
        ctx.moveTo(w * 0.1, y)
        ctx.lineTo(w * 0.1 + (major ? 14 : 7), y)
        ctx.stroke()
      }

      // The full channel, dim.
      ctx.beginPath()
      for (let i = 0; i <= 160; i++) {
        const v = i / 160
        const y = top + span * v
        const x = channelX(v, t, settle)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = "rgba(240,238,230,0.14)"
      ctx.lineWidth = 1.4
      ctx.stroke()

      // The lit stretch the pulse has already crossed.
      const colour = colourAhead
      const from = down ? 0 : head
      const to = down ? head : 1
      ctx.beginPath()
      let started = false
      for (let i = 0; i <= 160; i++) {
        const v = i / 160
        if (v < from || v > to) continue
        const y = top + span * v
        const x = channelX(v, t, settle)
        if (!started) { ctx.moveTo(x, y); started = true } else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = `rgba(${colour},0.85)`
      ctx.lineWidth = 2.2
      ctx.lineCap = "round"
      ctx.shadowBlur = 18
      ctx.shadowColor = `rgba(${colour},0.6)`
      ctx.stroke()
      ctx.shadowBlur = 0

      // Arrival rings.
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i]
        const age = t - ring.t
        if (age > 1.6) { rings.splice(i, 1); continue }
        const p = age / 1.6
        ctx.beginPath()
        ctx.arc(ring.x, ring.y, 10 + p * w * 0.3, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${ring.colour},${(1 - p) * 0.4})`
        ctx.lineWidth = 1.2
        ctx.stroke()
      }

      // The two nodes.
      const node = (y: number, active: boolean, tone: string) => {
        ctx.beginPath()
        ctx.arc(w * 0.5, y, 22, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${tone},${active ? 0.5 : 0.18})`
        ctx.lineWidth = 1.2
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(w * 0.5, y, 7, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${tone},${active ? 1 : 0.35})`
        ctx.shadowBlur = active ? 24 : 0
        ctx.shadowColor = `rgba(${tone},0.8)`
        ctx.fill()
        ctx.shadowBlur = 0
      }
      node(top, !down && head < 0.12, CYAN)
      node(bottom, down && head > 0.88, AMBER)

      // The pulse itself.
      const py = top + span * head
      const px = channelX(head, t, settle)
      const glow = ctx.createRadialGradient(px, py, 0, px, py, 46)
      glow.addColorStop(0, `rgba(${colour},0.4)`)
      glow.addColorStop(1, `rgba(${colour},0)`)
      ctx.fillStyle = glow
      ctx.fillRect(px - 46, py - 46, 92, 92)
      ctx.beginPath()
      ctx.arc(px, py, 5.5, 0, Math.PI * 2)
      ctx.fillStyle = "#ffffff"
      ctx.shadowBlur = 20
      ctx.shadowColor = `rgba(${colour},0.9)`
      ctx.fill()
      ctx.shadowBlur = 0
    }

    if (reduced) {
      draw(1800)
      return () => ro.disconnect()
    }

    let raf = 0
    let visible = true
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { rootMargin: "80px" })
    io.observe(host)
    const loop = (time: number) => {
      if (visible) draw(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, [])

  return (
    <div ref={hostRef} className={cn("relative", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 p-6 md:p-7">
        <div className="flex items-start justify-between text-[0.6rem] font-bold uppercase tracking-[0.18em]">
          <span className="text-white/40">Fig. 03 · The channel</span>
          <span className="flex items-center gap-2 text-primary"><span className="size-1.5 rounded-full bg-primary [animation:glyph-pulse_2s_ease-in-out_infinite]" />Open</span>
        </div>
        <p className="sr-only">An animation of a question travelling from a student to PI Tutors and an answer returning.</p>
        <p className="absolute right-6 top-[15%] -translate-y-1/2 text-right md:right-7">
          <span className="block text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/40">You</span>
          <span className="mt-1 block font-display text-2xl leading-none text-[#f0eee6]">Ask</span>
        </p>
        <p className="absolute right-6 top-[85%] -translate-y-1/2 text-right md:right-7">
          <span className="block text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/40">PI Tutors</span>
          <span className="mt-1 block font-display text-2xl leading-none text-secondary">Answer</span>
        </p>
      </div>
    </div>
  )
}

import { cn } from "@/lib/utils"

export type ValueGlyphKind = "notice" | "understand" | "precise" | "inviting" | "independent" | "partnership"

const blades = [0, 60, 120, 180, 240, 300]
const steps = [0, 1, 2]

// Instrument drawings for the six values, each cut as a thin line on a dark disc.
function Drawing({ kind }: { kind: ValueGlyphKind }) {
  return (
    <svg viewBox="0 0 64 64" className="size-[62%]" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {kind === "notice" && (
        <>
          <circle cx="32" cy="32" r="28" stroke="rgba(240,238,230,0.16)" strokeWidth="1.2" />
          <g className="glyph-iris origin-center" style={{ transformBox: "view-box" }}>
            {blades.map((a) => {
              const p = (d: number, r: number) => `${(32 + Math.cos(((a + d) * Math.PI) / 180) * r).toFixed(2)} ${(32 + Math.sin(((a + d) * Math.PI) / 180) * r).toFixed(2)}`
              return <path key={a} d={`M${p(-30, 25)} L${p(30, 25)}`} stroke="rgba(240,238,230,0.78)" strokeWidth="2.1" />
            })}
          </g>
          <circle cx="32" cy="32" r="8.5" fill="rgba(120,221,234,0.18)" stroke="#78ddea" strokeWidth="2.2" />
          <circle cx="28.5" cy="28.5" r="2.4" fill="#f2ad4d" className="[animation:glyph-pulse_3.6s_ease-in-out_infinite]" />
        </>
      )}

      {kind === "understand" && (
        <>
          <path d="M12 44 c6 -14, 10 4, 16 -8 c4 -8, -6 -10, -2 -16 c3 -5, 12 2, 14 10 c2 6, -4 10, -10 8" stroke="rgba(240,238,230,0.5)" strokeWidth="2" className="[animation:glyph-swap-out_6s_ease-in-out_infinite]" />
          <path data-draw d="M9 50 C21 50, 26 13, 55 13" stroke="#78ddea" strokeWidth="2.6" pathLength={1} strokeDasharray="1" className="[animation:glyph-swap-in_6s_ease-in-out_infinite]" />
          <circle cx="55" cy="13" r="3.4" fill="#f2ad4d" className="[animation:glyph-pulse_6s_ease-in-out_infinite]" />
        </>
      )}

      {kind === "precise" && (
        <>
          <line x1="7" y1="42" x2="57" y2="42" stroke="rgba(240,238,230,0.35)" strokeWidth="1.4" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1={8 + i * 4.3} y1="42" x2={8 + i * 4.3} y2={i % 4 === 0 ? 32 : 37} stroke={i === 8 ? "#f2ad4d" : "rgba(240,238,230,0.36)"} strokeWidth={i === 8 ? 2.4 : 1.3} />
          ))}
          <g className="[animation:glyph-slide_4.4s_var(--ease-out)_infinite]">
            <line x1="8" y1="15" x2="8" y2="46" stroke="#78ddea" strokeWidth="2.6" />
            <path d="M2 15 h12" stroke="#78ddea" strokeWidth="2.6" />
          </g>
        </>
      )}

      {kind === "inviting" && (
        <>
          <path d="M8 54 A38 38 0 0 1 55 17" stroke="rgba(240,238,230,0.18)" strokeWidth="1.3" strokeDasharray="2 5" />
          {steps.map((i) => (
            <rect key={i} x={10 + i * 15} y={45 - i * 10} width="12" height={11 + i * 10} rx="2.5" fill="rgba(120,221,234,0.12)" stroke="#78ddea" strokeWidth="2.1" className="[animation:glyph-pulse_3.6s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.35}s` }} />
          ))}
          <circle cx="55" cy="17" r="4.4" fill="#f2ad4d" className="[animation:glyph-pulse_3.6s_ease-in-out_1.05s_infinite]" />
          <circle cx="55" cy="17" r="9.5" stroke="rgba(242,173,77,0.4)" strokeWidth="1.4" />
        </>
      )}

      {kind === "independent" && (
        <>
          <circle cx="32" cy="38" r="21" stroke="rgba(120,221,234,0.22)" strokeWidth="1.6" />
          <circle data-draw cx="32" cy="38" r="21" stroke="#78ddea" strokeWidth="2.4" pathLength={1} strokeDasharray="1" className="[animation:glyph-draw_5s_ease-in-out_infinite]" />
          <g className="origin-center [animation:spin_5s_linear_infinite]" style={{ transformBox: "view-box", transformOrigin: "32px 38px" }}>
            <path d="M32 38 L32 14" stroke="rgba(240,238,230,0.8)" strokeWidth="2.2" />
            <path d="M32 14 L11 38" stroke="rgba(240,238,230,0.5)" strokeWidth="1.8" />
            <circle cx="11" cy="38" r="3" fill="#f2ad4d" />
          </g>
          <circle cx="32" cy="38" r="3.4" fill="#0a1013" stroke="#f0eee6" strokeWidth="2" />
        </>
      )}

      {kind === "partnership" && (
        <>
          <g className="[animation:glyph-breathe_5s_ease-in-out_infinite]">
            <circle cx="24" cy="32" r="18" stroke="#78ddea" strokeWidth="2.2" />
          </g>
          <g className="[animation:glyph-breathe_5s_ease-in-out_infinite_reverse]">
            <circle cx="40" cy="32" r="18" stroke="#f2ad4d" strokeWidth="2.2" />
          </g>
          <path d="M32 15.7 A18 18 0 0 1 32 48.3 A18 18 0 0 1 32 15.7 Z" fill="rgba(240,238,230,0.18)" />
          <circle cx="32" cy="32" r="3" fill="#f0eee6" />
        </>
      )}
    </svg>
  )
}

export function ValueGlyph({ kind, className }: { kind: ValueGlyphKind; className?: string }) {
  return (
    <span className={cn("lg-disc grid size-[4.75rem] shrink-0 place-items-center", className)} aria-hidden="true">
      <Drawing kind={kind} />
    </span>
  )
}

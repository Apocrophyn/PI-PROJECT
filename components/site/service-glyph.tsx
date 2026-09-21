import { cn } from "@/lib/utils"

export type GlyphKind = "one-to-one" | "small-group" | "online" | "assessment" | "exam" | "homework" | "university"

// Small looping line drawings that describe each format or service.
export function ServiceGlyph({ kind, className }: { kind: GlyphKind; className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={cn("size-[62%]", className)} aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {kind === "one-to-one" && (
        <>
          <line x1="26" y1="48" x2="70" y2="48" stroke="rgba(120,221,234,0.35)" strokeWidth="1.5" />
          <line x1="26" y1="48" x2="70" y2="48" stroke="#78ddea" strokeWidth="2" strokeDasharray="6 38" className="[animation:glyph-dash_2.4s_linear_infinite]" />
          <circle cx="26" cy="48" r="7" fill="#0b1013" stroke="#f0eee6" strokeWidth="1.5" />
          <circle cx="70" cy="48" r="7" fill="#0b1013" stroke="#f2ad4d" strokeWidth="1.5" />
        </>
      )}
      {kind === "small-group" && (
        <>
          <circle cx="48" cy="48" r="7" fill="#0b1013" stroke="#f0eee6" strokeWidth="1.5" />
          <circle cx="48" cy="48" r="24" stroke="rgba(120,221,234,0.25)" strokeDasharray="2 5" />
          <g className="origin-center [animation:spin_9s_linear_infinite]" style={{ transformBox: "view-box" }}>
            {[0, 90, 180, 270].map((a) => <circle key={a} cx={(48 + Math.cos((a * Math.PI) / 180) * 24).toFixed(2)} cy={(48 + Math.sin((a * Math.PI) / 180) * 24).toFixed(2)} r="4" fill={a === 0 ? "#f2ad4d" : "#78ddea"} />)}
          </g>
        </>
      )}
      {kind === "online" && (
        <>
          <rect x="30" y="54" width="36" height="14" rx="3" stroke="#f0eee6" strokeWidth="1.5" />
          {[12, 20, 28].map((r, i) => (
            <path key={r} d={`M${48 - r} ${50 - r * 0.3} A${r} ${r} 0 0 1 ${48 + r} ${50 - r * 0.3}`} stroke="#78ddea" strokeWidth="1.6" className="[animation:glyph-pulse_2.2s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.25}s` }} />
          ))}
        </>
      )}
      {kind === "assessment" && (
        <>
          <circle cx="48" cy="48" r="26" stroke="rgba(240,238,230,0.35)" strokeWidth="1.2" />
          <circle cx="48" cy="48" r="14" stroke="rgba(240,238,230,0.2)" strokeWidth="1" />
          <g className="origin-center [animation:spin_3.5s_linear_infinite]" style={{ transformBox: "view-box" }}>
            <path d="M48 48 L48 22 A26 26 0 0 1 70.5 35 Z" fill="rgba(120,221,234,0.22)" />
            <line x1="48" y1="48" x2="48" y2="22" stroke="#78ddea" strokeWidth="1.8" />
          </g>
          <circle cx="60" cy="38" r="2.5" fill="#f2ad4d" className="[animation:glyph-pulse_3.5s_ease-in-out_infinite]" />
        </>
      )}
      {kind === "exam" && (
        <>
          <circle cx="48" cy="52" r="24" stroke="#f0eee6" strokeWidth="1.5" />
          <line x1="48" y1="22" x2="48" y2="28" stroke="#f0eee6" strokeWidth="1.5" />
          <line x1="42" y1="20" x2="54" y2="20" stroke="#f0eee6" strokeWidth="1.5" />
          <g className="origin-center [animation:spin_4s_linear_infinite]" style={{ transformBox: "view-box", transformOrigin: "48px 52px" }}>
            <line x1="48" y1="52" x2="48" y2="35" stroke="#78ddea" strokeWidth="2" />
          </g>
          <path d="M48 28 A24 24 0 0 1 71 45" stroke="#f2ad4d" strokeWidth="2" />
        </>
      )}
      {kind === "homework" && (
        <>
          <path d="M22 62 C32 40, 42 70, 52 48 S70 36, 74 44" stroke="#78ddea" strokeWidth="2" pathLength={1} strokeDasharray="1" className="[animation:glyph-draw_3.2s_ease-in-out_infinite]" />
          <path d="M66 26 l8 8 l-22 22 l-10 2 l2 -10 z" stroke="#f0eee6" strokeWidth="1.5" />
          <line x1="22" y1="72" x2="74" y2="72" stroke="rgba(240,238,230,0.25)" />
        </>
      )}
      {kind === "university" && (
        <>
          <path d="M20 70 H36 V58 H52 V46 H68 V34 H78" stroke="#f0eee6" strokeWidth="1.5" />
          <circle r="4" fill="#f2ad4d" className="[animation:glyph-climb_3s_cubic-bezier(0.16,1,0.3,1)_infinite]" />
          <path d="M70 22 l8 -4 l8 4 l-8 4 z" stroke="#78ddea" strokeWidth="1.5" />
        </>
      )}
    </svg>
  )
}

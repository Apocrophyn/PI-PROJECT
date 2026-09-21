import { cn } from "@/lib/utils"

// The brand mark: a π cast in liquid chrome. The bar and the legs carry their own
// horizon so the metal reads as polished rather than as a flat gradient, and a cyan
// to amber tint ties it to the light beam that runs through the rest of the site.
export function PiMark({ className, animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("pi-mark", animated && "pi-mark-animated", className)} aria-hidden="true">
      <defs>
        <path id="pim-bar" d="M13 20 H51" fill="none" strokeLinecap="round" strokeWidth="6.8" />
        <g id="pim-legs" fill="none" strokeLinecap="round" strokeWidth="7.2">
          <path d="M23.2 21 C23.2 31.5, 22.3 40.8, 19.8 47.6" />
          <path d="M41.6 21 C41.6 32.5, 41.9 41.4, 44.1 45.6 C45.3 47.9, 47.2 48.4, 48.8 47" />
        </g>
        <mask id="pim-m-bar"><use href="#pim-bar" stroke="#fff" /></mask>
        <mask id="pim-m-legs"><use href="#pim-legs" stroke="#fff" /></mask>
        <linearGradient id="pim-bar-chrome" gradientUnits="userSpaceOnUse" x1="32" y1="16.4" x2="32" y2="23.6">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.16" stopColor="#eef5f7" />
          <stop offset="0.36" stopColor="#7f9099" />
          <stop offset="0.5" stopColor="#161f23" />
          <stop offset="0.6" stopColor="#5c6d76" />
          <stop offset="0.72" stopColor="#f4f9fa" />
          <stop offset="0.86" stopColor="#9aabb2" />
          <stop offset="1" stopColor="#354146" />
        </linearGradient>
        <linearGradient id="pim-leg-chrome" gradientUnits="userSpaceOnUse" x1="32" y1="21" x2="32" y2="50">
          <stop offset="0" stopColor="#2a3438" />
          <stop offset="0.1" stopColor="#b9c8cf" />
          <stop offset="0.22" stopColor="#f6fafb" />
          <stop offset="0.36" stopColor="#6d7d85" />
          <stop offset="0.48" stopColor="#141c20" />
          <stop offset="0.57" stopColor="#8496a0" />
          <stop offset="0.66" stopColor="#ffffff" />
          <stop offset="0.78" stopColor="#a8b7be" />
          <stop offset="0.9" stopColor="#3a464b" />
          <stop offset="1" stopColor="#9fb0b7" />
        </linearGradient>
        <linearGradient id="pim-tint" gradientUnits="userSpaceOnUse" x1="11" y1="0" x2="53" y2="0">
          <stop offset="0" stopColor="#78ddea" stopOpacity="0.5" />
          <stop offset="0.34" stopColor="#78ddea" stopOpacity="0" />
          <stop offset="0.66" stopColor="#f2ad4d" stopOpacity="0" />
          <stop offset="1" stopColor="#f2ad4d" stopOpacity="0.48" />
        </linearGradient>
        <linearGradient id="pim-sheen" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="18" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {(["legs", "bar"] as const).map((part) => (
        <g key={part} mask={`url(#pim-m-${part})`}>
          <rect width="64" height="64" fill={`url(#pim-${part === "bar" ? "bar" : "leg"}-chrome)`} />
          <rect width="64" height="64" fill="url(#pim-tint)" />
          <rect className="pi-sheen" x="-24" y="-8" width="18" height="80" fill="url(#pim-sheen)" />
        </g>
      ))}
    </svg>
  )
}

export function PiLogo({ className, animated }: { className?: string; animated?: boolean }) {
  return (
    <span className={cn("group inline-flex items-center gap-3.5", className)}>
      <PiMark animated={animated} className="size-12 shrink-0" />
      <span className="font-display text-[1.35rem] leading-none tracking-[-0.02em] text-[#f0eee6]">
        PI <span className="italic text-primary">Tutors</span>
      </span>
    </span>
  )
}

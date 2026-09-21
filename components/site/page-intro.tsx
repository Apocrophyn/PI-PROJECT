import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { ShimmerText } from "@/components/site/shimmer-text"

type Segment = string | { text: string; className?: string; base?: string }

export function PageIntro({ title, description, accent, className, side }: { title: Segment[] | string; description: string; accent?: string; className?: string; side?: ReactNode }) {
  return (
    <section className={cn("relative overflow-hidden border-b border-white/[0.08] pb-16 pt-14 md:pb-24 md:pt-24", className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 left-[12%] w-px origin-top bg-gradient-to-b from-transparent via-white/10 to-transparent [animation:grow-y_1.6s_var(--ease-out)_both]" />
        <div className="absolute inset-y-0 right-[22%] w-px origin-top bg-gradient-to-b from-transparent via-white/[0.07] to-transparent [animation:grow-y_1.6s_var(--ease-out)_0.2s_both]" />
        <div className="absolute inset-x-0 top-[62%] h-px origin-left bg-gradient-to-r from-transparent via-primary/40 to-transparent [animation:grow-x_1.8s_var(--ease-out)_0.3s_both]" />
        <div className="absolute right-[4%] top-[4%] font-display text-[clamp(12rem,30vw,32rem)] italic leading-none text-white/[0.022]">π</div>
      </div>
      <div className={cn("site-shell relative", side && "grid gap-12 md:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] md:items-center md:gap-16")}>
        <div>
          {accent && <p className="eyebrow opacity-0 [animation:letter-in_0.9s_var(--ease-out)_both]">{accent}</p>}
          <ShimmerText
            as="h1"
            intro
            introDelay={120}
            shineDelay={1600}
            segments={title}
            className="mt-6 block max-w-[12ch] font-display text-[clamp(3.4rem,8.4vw,8.2rem)] leading-[0.9] tracking-[-0.05em]"
          />
          <p className="body-large mt-8 max-w-2xl opacity-0 [animation:letter-in_1s_var(--ease-out)_0.55s_both]">{description}</p>
        </div>
        {side && <div className="relative opacity-0 [animation:letter-in_1.2s_var(--ease-out)_0.35s_both]">{side}</div>}
      </div>
    </section>
  )
}

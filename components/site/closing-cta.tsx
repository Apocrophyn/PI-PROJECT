import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShimmerText } from "@/components/site/shimmer-text"
import { OrbitDial } from "@/components/site/motion-kit"
import { ChromePi } from "@/components/site/chrome-pi"
import { SectionReveal } from "@/components/site/section-reveal"

export function ClosingCta({ title = "Ready for the idea to click?", description = "Tell us where learning feels stuck. We’ll help you find the right tutor, subject support and format." }: { title?: string; description?: string }) {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#050708] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_50%,rgba(120,221,234,0.07),transparent_38rem)]" />
      <div className="site-shell relative grid items-center gap-6 md:grid-cols-[1fr_1fr] md:gap-10">
        <SectionReveal>
          <p className="eyebrow">Start a conversation</p>
          <ShimmerText as="h2" segments={title} className="section-title mt-6 block max-w-[11ch]" shineDelay={400} />
          <p className="body-large mt-7 max-w-xl">{description}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="ivory" size="lg" asChild><Link href="/contact">Start a conversation <ArrowUpRight data-icon /></Link></Button>
            <Button variant="glass" size="lg" asChild><a href="tel:+447588609243">Call 07588 609243</a></Button>
          </div>
        </SectionReveal>

        <div className="relative mx-auto aspect-square w-full max-w-[36rem]">
          <OrbitDial label="" className="absolute inset-0 opacity-80" />
          <ChromePi className="absolute inset-[6%]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-[18%] bottom-[9%] h-8 rounded-[50%] bg-[radial-gradient(closest-side,rgba(120,221,234,0.22),transparent)] blur-md" />
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ShimmerText } from "@/components/site/shimmer-text"
import { OrbitDial } from "@/components/site/motion-kit"

export const metadata = {
  title: "Page not found",
  description: "That page does not exist. Find mathematics and science tutoring for KS3, GCSE and A-Level instead.",
  robots: { index: false, follow: true },
}

const routes = [
  { label: "Tutoring services", href: "/services", note: "Formats, subjects and rates" },
  { label: "Our tutors", href: "/tutors", note: "Who teaches what" },
  { label: "Articles", href: "/articles", note: "Revision and exam guidance" },
  { label: "Contact", href: "/contact", note: "Arrange a session" },
]

export default function NotFound() {
  return (
    <div className="relative overflow-hidden bg-[#050708]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-[52%] h-px origin-left bg-gradient-to-r from-transparent via-primary/30 to-transparent [animation:grow-x_1.8s_var(--ease-out)_0.3s_both]" />
      </div>
      <section className="site-shell relative grid items-center gap-14 py-24 md:grid-cols-[1.15fr_0.85fr] md:gap-20 md:py-32">
        <div>
          <p className="eyebrow opacity-0 [animation:letter-in_0.9s_var(--ease-out)_both]">Error 404</p>
          <ShimmerText
            as="h1"
            intro
            introDelay={120}
            shineDelay={1600}
            segments={["This page went ", { text: "missing.", className: "italic", base: "#78ddea" }]}
            className="mt-6 block max-w-[11ch] font-display text-[clamp(3rem,7vw,6.4rem)] leading-[0.92] tracking-[-0.05em]"
          />
          <p className="body-large mt-7 max-w-lg opacity-0 [animation:letter-in_1s_var(--ease-out)_0.5s_both]">
            The address you followed does not exist, or the page has moved. Everything else is where you left it.
          </p>
          <ul className="mt-12 border-b border-white/10">
            {routes.map((route, index) => (
              <li key={route.href} className="border-t border-white/10 opacity-0 [animation:letter-in_0.9s_var(--ease-out)_both]" style={{ animationDelay: `${650 + index * 90}ms` }}>
                <Link href={route.href} className="group relative flex items-center gap-5 py-5">
                  <span className="min-w-0 flex-1 font-display text-xl text-[#f0eee6] md:text-2xl">{route.label}</span>
                  <span className="hidden text-[0.65rem] uppercase tracking-[0.14em] text-white/45 sm:block">{route.note}</span>
                  <ArrowUpRight className="size-4 shrink-0 text-white/40 transition-all duration-500 group-hover:rotate-45 group-hover:text-primary" />
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary to-secondary transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[26rem] opacity-0 [animation:letter-in_1.2s_var(--ease-out)_0.4s_both]">
          <OrbitDial label="404" className="absolute inset-0 opacity-80" />
        </div>
      </section>
    </div>
  )
}

import Link from "next/link"
import { ArrowUpRight, Github, Mail, MapPin, Phone } from "lucide-react"
import { PiLogo } from "@/components/site/pi-mark"
import { ShimmerText } from "@/components/site/shimmer-text"
import { InViewShimmer } from "@/components/site/in-view-shimmer"

const DEVELOPER = {
  name: "Apocrophyn",
  github: "https://github.com/Apocrophyn",
  email: "ahsana123456@gmail.com",
}

const links = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Tutors", href: "/tutors" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/contact" },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#040607]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="site-shell pt-16 md:pt-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_0.6fr_1fr]">
          <div>
            <Link href="/" aria-label="PI Tutors home" className="inline-block"><PiLogo /></Link>
            <p className="mt-7 max-w-md font-display text-3xl leading-[1.1] tracking-[-0.02em] text-[#f0eee6] md:text-[2.6rem]">Where difficult ideas become beautifully understood.</p>
          </div>

          <div>
            <p className="text-[0.67rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Explore</p>
            <ul className="mt-2">
              {links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group inline-flex min-h-11 items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary">
                    <span className="h-px w-0 bg-primary transition-all duration-500 group-hover:w-4" />{item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.67rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Start a conversation</p>
            <ul className="mt-2 text-sm text-foreground/80">
              <li><a href="mailto:info@pitutors.com" className="flex min-h-11 items-center gap-3 transition-colors hover:text-primary"><Mail className="size-4 text-primary" />info@pitutors.com</a></li>
              <li><a href="tel:+447588609243" className="flex min-h-11 items-center gap-3 transition-colors hover:text-primary"><Phone className="size-4 text-primary" />07588 609243</a></li>
              <li className="flex min-h-11 items-center gap-3"><MapPin className="size-4 text-primary" />Rotherham, Birmingham &amp; online</li>
            </ul>
            <Link href="/contact" className="lg mt-7 inline-flex h-11 items-center gap-2.5 rounded-full px-5 text-[0.7rem] font-semibold uppercase tracking-[0.14em]">Make an enquiry <ArrowUpRight data-icon className="size-4" /></Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} PI Tutors · KS3, GCSE &amp; A-Level</span>
          <span className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="inline-flex min-h-11 items-center transition-colors hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="inline-flex min-h-11 items-center transition-colors hover:text-foreground">Terms</Link>
            <Link href="/sitemap.xml" className="inline-flex min-h-11 items-center transition-colors hover:text-foreground">Sitemap</Link>
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-3 text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="text-white/35">Designed &amp; developed by {DEVELOPER.name}</span>
          <span className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={DEVELOPER.github} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-11 items-center gap-2 transition-colors hover:text-primary">
              <Github className="size-3.5" />GitHub
              <ArrowUpRight className="size-3 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href={`mailto:${DEVELOPER.email}`} className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-primary">
              <Mail className="size-3.5" />{DEVELOPER.email}
            </a>
          </span>
        </div>
      </div>

      <InViewShimmer className="relative mt-6 select-none overflow-hidden">
        <ShimmerText
          segments={["PI ", { text: "Tutors", className: "italic" }]}
          base="rgba(240,238,230,0.07)"
          cycle={4.5}
          step={95}
          className="block translate-y-[18%] whitespace-nowrap text-center font-display text-[clamp(6rem,24vw,24rem)] leading-[0.8] tracking-[-0.06em]"
        />
      </InViewShimmer>
    </footer>
  )
}

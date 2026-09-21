import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroMount } from "@/components/site/hero-mount"
import { SubjectChambers } from "@/components/site/subject-chambers"
import { SectionReveal } from "@/components/site/section-reveal"
import { ClosingCta } from "@/components/site/closing-cta"
import { ClipImage, CountUp, Marquee, ScrollLit, Slab } from "@/components/site/motion-kit"
import { ShimmerText } from "@/components/site/shimmer-text"
import { tutors, subjectGroups } from "@/lib/site-data"
import { absolute, breadcrumbs, JsonLd, pageMetadata, SITE } from "@/lib/seo"

const band = ["KS3", "GCSE", "A-Level", "Mathematics", "Physics", "Chemistry", "Biology", "Online", "Rotherham", "Birmingham"]

const pricing: { title: string; amount?: number; unit: string; note: string; copy: string }[] = [
  { title: "One-to-one", amount: 35, unit: "per hour", note: "KS3 & GCSE · £50 per hour for A-Level", copy: "Focused sessions shaped around one student’s gaps, goals and pace." },
  { title: "Small group", amount: 25, unit: "per student, per hour", note: "Up to four students", copy: "Collaborative momentum with direct tutor attention for every student." },
  { title: "Online", amount: undefined, unit: "wherever you study", note: "Live and interactive", copy: "Live, interactive teaching with digital whiteboards and individual feedback." },
]

export const metadata = pageMetadata({
  title: "PI Tutors | GCSE & A-Level Maths & Science Tutoring",
  ogTitle: "PI Tutors: GCSE & A-Level Maths and Science Tutoring",
  description: "Personalised maths, physics, chemistry and biology tutoring for KS3, GCSE and A-Level. Qualified teachers, one-to-one and small groups, from £25 per hour.",
  path: "/",
  keywords: [
    "maths tutor rotherham",
    "gcse maths tutor birmingham",
    "a level maths tutor",
    "science tutor uk",
    "online gcse tutoring",
    "ks3 maths tutor",
    "physics tutor birmingham",
  ],
})

const serviceGraph = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE.url}/#tutoring`,
  name: "Mathematics and science tutoring",
  serviceType: "Private tutoring",
  provider: { "@id": `${SITE.url}/#organisation` },
  areaServed: SITE.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
  audience: { "@type": "EducationalAudience", educationalRole: "student" },
  url: absolute("/services"),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tutoring formats",
    itemListElement: [
      { "@type": "Offer", name: "One-to-one tutoring, KS3 and GCSE", price: "35", priceCurrency: "GBP", unitText: "hour" },
      { "@type": "Offer", name: "One-to-one tutoring, A-Level", price: "50", priceCurrency: "GBP", unitText: "hour" },
      { "@type": "Offer", name: "Small-group tutoring", price: "25", priceCurrency: "GBP", unitText: "hour per student" },
    ].map((offer) => ({ ...offer, availability: "https://schema.org/InStock", category: "Tutoring" })),
  },
  subjectOf: subjectGroups.map((subject) => ({ "@type": "Course", name: `${subject.title} tutoring`, description: subject.detail, provider: { "@id": `${SITE.url}/#organisation` } })),
}

export default function HomePage() {
  return (
    <div className="bg-[#050708]">
      <HeroMount />

      <section className="border-y border-white/[0.08] bg-[#050708] py-8 md:py-10" aria-label="What we teach">
        <Marquee items={band} />
      </section>

      <SubjectChambers />

      <section className="page-section bg-[#070a0c]">
        <div className="site-shell">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <SectionReveal>
              <p className="eyebrow">The people behind the progress</p>
              <ShimmerText as="h2" segments={["Subject experts. ", { text: "Human", className: "italic", base: "#78ddea" }, " teachers."]} className="section-title mt-6 block" shineDelay={600} />
            </SectionReveal>
            <ScrollLit
              text="Advanced subject knowledge matters. So does noticing hesitation, asking the right question and explaining an idea until it finally lands."
              className="font-display text-[clamp(1.5rem,2.4vw,2.2rem)] leading-[1.2] tracking-[-0.02em]"
            />
          </div>

          <div className="mt-16 grid items-start gap-6 md:mt-24 md:grid-cols-2 md:gap-8">
            {tutors.map((tutor, index) => (
              <SectionReveal key={tutor.slug} delay={index * 0.1}>
                <Link href={`/tutors#${tutor.slug}`} className="group block">
                  <div className="relative">
                    <ClipImage src={tutor.image} alt={`${tutor.name}, ${tutor.role}`} sizes="(max-width: 767px) 100vw, 50vw" className="aspect-[4/5]" imageClassName="object-[50%_18%] transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" parallax={3} />
                    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-[#050708] via-transparent to-transparent" />
                    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 transition-shadow duration-500 group-hover:ring-primary/40" />
                    <span className="lg absolute right-5 top-5 grid size-12 place-items-center rounded-full"><ArrowUpRight data-icon className="size-4" /></span>
                  </div>
                  <div className="mt-6 flex items-end justify-between gap-6">
                    <div>
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.17em] text-primary">{tutor.role}</p>
                      <h3 className="mt-3 font-display text-4xl leading-[1.02] tracking-[-0.03em] md:min-h-[2.1em] md:text-[2.8rem]">{tutor.name}</h3>
                    </div>
                    <p className="hidden shrink-0 text-right text-xs uppercase leading-6 tracking-[0.13em] text-white/55 sm:block">{tutor.location}<br />{tutor.availability}</p>
                  </div>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">{tutor.qualifications}</p>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section border-t border-white/[0.08] bg-[#050708]">
        <div className="site-shell">
          <SectionReveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Ways to learn</p>
              <h2 className="section-title mt-6 max-w-[12ch]">Transparent, simple, <span className="italic text-primary">flexible.</span></h2>
            </div>
            <Button variant="glass" asChild><Link href="/services">All services <ArrowUpRight data-icon /></Link></Button>
          </SectionReveal>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {pricing.map((item, index) => (
              <SectionReveal key={item.title} delay={index * 0.08}>
                <Slab className="h-full" faceClassName="flex min-h-[25rem] flex-col p-7 md:p-9">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.17em] text-primary">0{index + 1}</span>
                    <span className="text-[0.65rem] uppercase tracking-[0.14em] text-white/45">{item.note}</span>
                  </div>
                  <h3 className="mt-12 font-display text-4xl tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.copy}</p>
                  <div className="mt-auto flex items-end gap-3 border-t border-white/10 pt-6">
                    {item.amount ? <CountUp to={item.amount} prefix="£" className="font-display text-6xl leading-none tracking-[-0.04em] text-[#f0eee6]" /> : <span className="font-display text-6xl italic leading-none tracking-[-0.04em] text-[#f0eee6]">Live</span>}
                    <span className="pb-1 text-xs uppercase tracking-[0.13em] text-white/55">{item.unit}</span>
                  </div>
                </Slab>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />

      <JsonLd data={serviceGraph} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }])} />
    </div>
  )
}

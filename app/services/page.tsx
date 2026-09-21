import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionReveal } from "@/components/site/section-reveal"
import { ClosingCta } from "@/components/site/closing-cta"
import { SubjectRows } from "@/components/site/subject-rows"
import { ShimmerText } from "@/components/site/shimmer-text"
import { LiquidPi } from "@/components/site/liquid-pi"
import { ServiceGlyph, type GlyphKind } from "@/components/site/service-glyph"
import { CountUp, Marquee, Slab } from "@/components/site/motion-kit"
import { formats, subjectGroups, supportServices } from "@/lib/site-data"
import { absolute, breadcrumbs, JsonLd, pageMetadata, SITE } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Tutoring Services, Subjects & Rates",
  ogTitle: "Tutoring Services: Maths, Physics, Chemistry & Biology",
  description: "One-to-one and small-group tutoring in maths, physics, chemistry and biology for KS3, GCSE and A-Level. Online and in person, from £25 per hour.",
  path: "/services",
  keywords: [
    "gcse maths tutoring",
    "a level maths tutoring",
    "gcse physics tutor",
    "gcse chemistry tutor",
    "gcse biology tutor",
    "one to one tutoring uk",
    "small group tutoring",
    "tutoring rates uk",
  ],
})

const coursesGraph = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Subjects taught by PI Tutors",
  itemListElement: subjectGroups.map((subject, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Course",
      name: `${subject.title} tutoring (${subject.levels})`,
      description: subject.detail,
      url: absolute("/services#subjects"),
      provider: { "@id": `${SITE.url}/#organisation` },
      educationalLevel: subject.stages.join(", "),
      inLanguage: "en-GB",
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: ["online", "onsite"],
        courseWorkload: "PT1H",
        location: { "@type": "Place", name: "Rotherham, Birmingham and online" },
      },
      offers: { "@type": "Offer", category: "Paid", priceCurrency: "GBP", price: "35", availability: "https://schema.org/InStock" },
    },
  })),
}

const formatGlyphs: GlyphKind[] = ["one-to-one", "small-group", "online"]
const supportGlyphs: GlyphKind[] = ["assessment", "exam", "homework", "university"]

export default function ServicesPage() {
  return (
    <div className="bg-[#050708]">
      <section className="relative overflow-hidden border-b border-white/[0.08] pb-16 pt-12 md:pb-24 md:pt-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[46%] h-px origin-left bg-gradient-to-r from-transparent via-primary/30 to-transparent [animation:grow-x_1.8s_var(--ease-out)_0.3s_both]" />
        <div className="site-shell grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-16">
          <div>
            <p className="eyebrow opacity-0 [animation:letter-in_0.9s_var(--ease-out)_both]">Tutoring services</p>
            <ShimmerText
              as="h1"
              intro
              introDelay={120}
              shineDelay={1600}
              segments={["The right support, at the ", { text: "right depth.", className: "italic", base: "#78ddea" }]}
              className="mt-6 block max-w-[11ch] font-display text-[clamp(3rem,6.4vw,6.4rem)] leading-[0.92] tracking-[-0.05em]"
            />
            <p className="body-large mt-7 max-w-lg opacity-0 [animation:letter-in_1s_var(--ease-out)_0.55s_both]">Subject teaching, assessment and flexible formats, focused on what the student needs to understand next.</p>
            <div className="mt-9 flex flex-wrap items-center gap-3 opacity-0 [animation:letter-in_1s_var(--ease-out)_0.7s_both]">
              <Button variant="ivory" size="lg" asChild><Link href="/contact">Book a session <ArrowUpRight data-icon /></Link></Button>
              <Button variant="glass" size="lg" asChild><a href="#subjects">See the subjects</a></Button>
            </div>
            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-6 opacity-0 [animation:letter-in_1s_var(--ease-out)_0.85s_both]">
              {[["Levels", "KS3 to A-Level"], ["Subjects", "Maths & sciences"], ["From", "£25 / hour"]].map(([k, v]) => (
                <div key={k}><dt className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/45">{k}</dt><dd className="mt-2 font-display text-xl md:text-2xl">{v}</dd></div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <Slab radius={24} depth={18} lift={false} faceClassName="p-2.5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[radial-gradient(120%_90%_at_50%_18%,#101a1e,#040709_62%)]">
                <LiquidPi className="absolute inset-0" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-[16%] bottom-[11%] h-10 rounded-[50%] bg-[radial-gradient(closest-side,rgba(120,221,234,0.2),transparent)] blur-lg" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10" />
              </div>
            </Slab>
            <p className="mt-4 text-center text-[0.64rem] font-bold uppercase tracking-[0.18em] text-white/35">One constant, shaped to each student</p>
          </div>
        </div>
      </section>

      <section id="subjects" className="page-section scroll-mt-20">
        <div className="site-shell">
          <SectionReveal className="max-w-3xl">
            <h2 className="section-title">Build the idea. Then build <span className="italic text-primary">on it.</span></h2>
            <p className="body-large mt-6">Four subjects, taught the same way: find where understanding stopped, rebuild it, then stretch it. Support runs from foundations to advanced reasoning.</p>
          </SectionReveal>
          <div className="mt-14 md:mt-20"><SubjectRows /></div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] py-8 md:py-10" aria-label="Formats">
        <Marquee items={["One-to-one", "Small groups", "Online", "In person", "Exam preparation", "Homework support", "University support"]} />
      </section>

      <section className="page-section bg-[#070a0c]">
        <div className="site-shell">
          <SectionReveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="section-title max-w-[12ch]">A format that fits the <span className="italic text-primary">student.</span></h2>
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">KS3 and GCSE one-to-one sessions are £35 per hour. A-Level one-to-one sessions are £50 per hour. Small-group sessions are £25 per student per hour.</p>
          </SectionReveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {formats.map((format, index) => (
              <SectionReveal key={format.title} delay={index * 0.08} className="h-full">
                <Slab className="h-full" faceClassName="flex min-h-[34rem] flex-col p-7 md:p-9">
                  <div className="flex items-start justify-between">
                    <span className="lg-disc grid size-[5.25rem] place-items-center"><ServiceGlyph kind={formatGlyphs[index]} /></span>
                    <span className="text-[0.62rem] uppercase tracking-[0.14em] text-white/45">{format.note}</span>
                  </div>
                  <h3 className="mt-8 font-display text-[2.6rem] leading-none tracking-[-0.03em]">{format.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{format.description}</p>
                  <ul className="mt-7 space-y-3">
                    {format.features.map((feature) => <li key={feature} className="flex items-center gap-3 text-sm text-foreground/85"><span className="h-px w-4 bg-gradient-to-r from-primary to-secondary" />{feature}</li>)}
                  </ul>
                  <div className="mt-auto flex items-end gap-3 border-t border-white/10 pt-6">
                    {format.price.startsWith("£") ? <CountUp to={Number(format.price.slice(1))} prefix="£" className="font-display text-6xl leading-none tracking-[-0.04em]" /> : <span className="font-display text-6xl italic leading-none tracking-[-0.04em]">{format.price}</span>}
                    <span className="pb-1 text-xs uppercase tracking-[0.13em] text-white/55">{format.unit}</span>
                  </div>
                </Slab>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="site-shell">
          <SectionReveal className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <h2 className="section-title">Support around the <span className="italic text-primary">subject.</span></h2>
            <div className="md:justify-self-end">
              <p className="body-large">Structured help for the moments that matter most, from a first assessment to the next step after school.</p>
              <Button variant="glass" className="mt-7" asChild><Link href="/contact">Discuss your needs <ArrowUpRight data-icon /></Link></Button>
            </div>
          </SectionReveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {supportServices.map((service, index) => (
              <SectionReveal key={service.title} delay={(index % 2) * 0.08} className="h-full">
                <Slab className="group h-full" faceClassName="grid h-full gap-6 p-7 sm:grid-cols-[auto_1fr] md:p-9">
                  <span className="lg-disc grid size-[5.75rem] shrink-0 place-items-center"><ServiceGlyph kind={supportGlyphs[index]} /></span>
                  <div>
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.17em] text-primary">0{index + 1}</span>
                    <h3 className="mt-3 font-display text-4xl tracking-[-0.03em] transition-colors duration-500 group-hover:text-primary">{service.title}</h3>
                    <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">{service.description}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {service.features.map((feature) => <li key={feature} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-white/70"><Check className="size-3 text-primary" />{feature}</li>)}
                    </ul>
                  </div>
                </Slab>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <JsonLd data={coursesGraph} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <ClosingCta title="Not sure which route fits?" description="Tell us the subject, level and what currently feels difficult. We’ll recommend a practical starting point." />
    </div>
  )
}

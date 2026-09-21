import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Clock3, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageIntro } from "@/components/site/page-intro"
import { SectionReveal } from "@/components/site/section-reveal"
import { ClosingCta } from "@/components/site/closing-cta"
import { ClipImage, Slab } from "@/components/site/motion-kit"
import { tutors } from "@/lib/site-data"
import { absolute, breadcrumbs, JsonLd, pageMetadata, SITE } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Our Tutors: Qualified Maths & Science Teachers",
  ogTitle: "Our Tutors: Qualified Maths & Physics Teachers",
  description: "Meet the qualified teachers behind PI Tutors: a mathematics specialist in Rotherham and a physics specialist and IGCSE examiner in Birmingham.",
  path: "/tutors",
  keywords: ["qualified maths tutor", "physics tutor birmingham", "maths tutor rotherham", "igcse physics examiner", "experienced gcse tutor"],
})

const peopleGraph = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: tutors.map((tutor, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Person",
      name: tutor.name,
      jobTitle: tutor.role,
      description: tutor.description,
      image: absolute(tutor.image),
      url: absolute(`/tutors#${tutor.slug}`),
      worksFor: { "@id": `${SITE.url}/#organisation` },
      knowsAbout: tutor.subjects,
      homeLocation: { "@type": "Place", name: tutor.location },
    },
  })),
}

export default function TutorsPage() {
  return (
    <div className="bg-[#050708]">
      <PageIntro
        accent="Meet the tutors"
        title={["Expertise you can ", { text: "feel", className: "italic", base: "#78ddea" }, " in the explanation."]}
        description="Deep subject knowledge, classroom experience and the patience to keep reframing an idea until it becomes the student’s own."
        side={
          <div className="space-y-3">
            {tutors.map((tutor) => (
              <Link key={tutor.slug} href={`#${tutor.slug}`} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0a0f12] p-3 pr-5 transition-colors duration-500 hover:border-primary/40">
                <span className="relative block size-16 shrink-0 overflow-hidden rounded-xl"><Image src={tutor.image} alt="" fill sizes="64px" className="object-cover object-top transition-transform duration-700 group-hover:scale-110" /></span>
                <span className="min-w-0"><span className="block font-display text-xl text-foreground">{tutor.name}</span><span className="mt-1 block text-[0.6rem] font-bold uppercase tracking-[0.13em] text-primary">{tutor.role}</span></span>
                <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        }
      />

      <section className="page-section">
        <div className="site-shell space-y-28 md:space-y-44">
          {tutors.map((tutor, index) => (
            <article id={tutor.slug} key={tutor.slug} className="scroll-mt-28">
              <div className={`grid gap-10 md:grid-cols-2 md:items-center md:gap-20 ${index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative">
                  <ClipImage src={tutor.image} alt={`${tutor.name}, ${tutor.role}`} sizes="(max-width: 767px) 100vw, 50vw" className="aspect-[4/5]" imageClassName="object-[50%_18%]" parallax={4} />
                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-[#050708]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-6 left-6 rounded-full border border-white/15 bg-[#050708]/80 px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-primary">{tutor.role}</span>
                  <span aria-hidden="true" className="absolute -right-3 -top-3 hidden font-display text-8xl italic leading-none text-white/[0.06] md:block">0{index + 1}</span>
                </div>

                <SectionReveal delay={0.08}>
                  <p className="text-[0.67rem] font-bold uppercase tracking-[0.17em] text-primary">Tutor profile · 0{index + 1}</p>
                  <h2 className="mt-5 font-display text-[clamp(3rem,5.6vw,5.8rem)] leading-[0.92] tracking-[-0.045em]">{tutor.name}</h2>
                  <p className="mt-7 text-lg leading-8 text-muted-foreground">{tutor.description}</p>
                  <div className="mt-9 space-y-3">
                    {[
                      ["Subjects", tutor.subjects],
                      ["Qualifications", tutor.qualifications],
                      ["Experience", tutor.experience],
                    ].map(([term, detail]) => (
                      <Slab key={term} radius={14} depth={5} faceClassName="grid gap-2 p-5 md:grid-cols-[8rem_1fr]">
                        <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-foreground/75">{term}</p>
                        <p className="text-sm leading-7 text-muted-foreground">{detail}</p>
                      </Slab>
                    ))}
                  </div>
                  <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.12em] text-foreground/75">
                    <span className="flex items-center gap-2"><MapPin className="size-4 text-primary" />{tutor.location}</span>
                    <span className="flex items-center gap-2"><Clock3 className="size-4 text-primary" />{tutor.availability}</span>
                  </div>
                  <Button variant="ivory" size="lg" className="mt-9" asChild><Link href="/contact#contact-form">Enquire about {tutor.shortName} <ArrowUpRight data-icon /></Link></Button>
                </SectionReveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section border-t border-white/[0.08] bg-[#070a0c]">
        <div className="site-shell grid gap-12 md:grid-cols-[0.7fr_1.3fr] md:gap-24">
          <SectionReveal><p className="eyebrow">In every session</p><h2 className="section-title mt-6">Three things stay <span className="italic text-primary">constant.</span></h2></SectionReveal>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Concept", "Build a connected understanding before relying on a formula."],
              ["Practice", "Choose problems that expose thinking and create useful stretch."],
              ["Feedback", "Make the next improvement specific, visible and achievable."],
            ].map(([title, text], index) => (
              <SectionReveal key={title} delay={index * 0.07}>
                <Slab className="h-full" faceClassName="min-h-64 p-7">
                  <span className="text-xs font-bold text-primary">0{index + 1}</span>
                  <h3 className="mt-12 font-display text-3xl">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{text}</p>
                </Slab>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <JsonLd data={peopleGraph} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Tutors", path: "/tutors" }])} />
      <ClosingCta title="Find the tutor who fits the goal." />
    </div>
  )
}

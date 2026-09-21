import { PageIntro } from "@/components/site/page-intro"
import { ValueGlyph, type ValueGlyphKind } from "@/components/site/value-glyph"
import { SectionReveal } from "@/components/site/section-reveal"
import { ClosingCta } from "@/components/site/closing-cta"
import { MethodTimeline } from "@/components/site/method-timeline"
import { ScrollLit, Slab } from "@/components/site/motion-kit"
import { UnitCircleWave, UnrollingCircle } from "@/components/site/math-graphics"
import { breadcrumbs, JsonLd, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "About & How We Teach",
  ogTitle: "About PI Tutors: How We Teach",
  description: "Our concept-first approach to maths and science tutoring: find where understanding stopped, rebuild it, then stretch it. Notice, explain, test, transfer.",
  path: "/about",
  keywords: ["how tutoring works", "concept first teaching", "maths teaching method", "pi tutors about"],
})

const values: { glyph: ValueGlyphKind; title: string; description: string }[] = [
  { glyph: "notice", title: "See the student", description: "We pay attention to how each learner thinks, where confidence dips and what makes an idea connect." },
  { glyph: "understand", title: "Teach for understanding", description: "We build the reasoning beneath a method, not a short-lived script for one type of question." },
  { glyph: "precise", title: "Be honest and precise", description: "Clear feedback, transparent expectations and careful subject knowledge guide every session." },
  { glyph: "inviting", title: "Make challenge inviting", description: "Demanding work should feel purposeful, achievable and rewarding, not intimidating." },
  { glyph: "independent", title: "Build independence", description: "The goal is a student who can choose a strategy, test it and recover when the answer is not immediate." },
  { glyph: "partnership", title: "Work in partnership", description: "Students, families and tutors share a clear view of priorities, progress and the next step." },
]

const method = [
  { title: "Notice", description: "Find the precise gap: knowledge, confidence, language or method." },
  { title: "Explain", description: "Reframe the idea with a representation that makes its structure visible." },
  { title: "Test", description: "Use deliberate questions to check understanding, not just recognition." },
  { title: "Transfer", description: "Apply the idea in a new context until the student can navigate independently." },
]

export default function AboutPage() {
  return (
    <div className="bg-[#050708]">
      <PageIntro
        accent="About PI Tutors"
        title={["Teaching that changes how a student ", { text: "sees", className: "italic", base: "#78ddea" }, " the problem."]}
        description="PI Tutors was founded on a simple belief: students often struggle not because they lack ability, but because an explanation has not yet met the way they think."
        side={
          <Slab radius={26} depth={10} faceClassName="p-6 md:p-8">
            <div className="flex items-center justify-between text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/45">
              <span>Fig. 01 · The unit circle</span>
              <span className="text-primary">Live</span>
            </div>
            <UnitCircleWave className="mt-4" />
            <p className="mt-2 text-sm leading-7 text-muted-foreground">One idea, seen two ways: turning becomes a wave. Good teaching makes that link obvious.</p>
          </Slab>
        }
      />

      <section className="page-section">
        <div className="site-shell">
          <p className="eyebrow">Why π</p>
          <ScrollLit
            text="Mathematics and science can feel like disconnected rules when the relationships underneath are hidden. Our work is to make those relationships visible."
            className="mt-8 max-w-5xl font-display text-[clamp(2rem,4.4vw,4.4rem)] leading-[1.06] tracking-[-0.035em]"
          />
          <div className="mt-16 md:mt-24">
            <Slab radius={30} depth={12} faceClassName="p-6 md:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/45">
                <span>Fig. 02 · Why π is π</span>
                <span>Scroll to roll the circle</span>
              </div>
              <UnrollingCircle className="mt-6" />
            </Slab>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
            <SectionReveal>
              <h2 className="font-display text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.05] tracking-[-0.03em]">A circle one unit across travels exactly <span className="italic text-primary">π</span> in one turn.</h2>
            </SectionReveal>
            <SectionReveal delay={0.08} className="space-y-6 text-base leading-8 text-muted-foreground">
              <p>Led by Dr Muhammad Taimur Khan, PI Tutors brings together advanced subject knowledge and practical classroom experience. Sessions are personal, deliberate and rooted in the way a student actually learns.</p>
              <p>The result is more than a completed worksheet. It is a student who can explain the idea, apply it somewhere new and trust their own thinking.</p>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="page-section border-y border-white/[0.08] bg-[#070a0c]">
        <div className="site-shell">
          <SectionReveal className="grid gap-8 md:grid-cols-2 md:items-end">
            <div><p className="eyebrow">What guides us</p><h2 className="section-title mt-6">Rigour with <span className="italic text-primary">warmth.</span></h2></div>
            <p className="body-large">High standards and patient teaching belong together. These principles shape how we explain, challenge and support.</p>
          </SectionReveal>
          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <SectionReveal key={value.title} delay={(index % 3) * 0.07}>
                <Slab className="group h-full" faceClassName="min-h-72 p-7 md:p-9">
                  <div className="flex items-start justify-between">
                    <ValueGlyph kind={value.glyph} />
                    <span className="text-[0.62rem] font-bold tracking-[0.16em] text-white/40">0{index + 1}</span>
                  </div>
                  <h3 className="mt-10 font-display text-3xl tracking-[-0.02em]">{value.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{value.description}</p>
                </Slab>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="site-shell grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-24">
          <SectionReveal className="md:sticky md:top-[calc(var(--header-h)+3rem)] md:self-start">
            <p className="eyebrow">The PI Tutors method</p>
            <h2 className="section-title mt-6">Notice. Explain. Test. <span className="italic text-primary">Transfer.</span></h2>
            <p className="body-large mt-6">Four deliberate moves that turn a confusing topic into something a student can explain, apply and own.</p>
          </SectionReveal>
          <MethodTimeline steps={method} />
        </div>
      </section>

      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <ClosingCta title="Let’s find the explanation that lands." />
    </div>
  )
}

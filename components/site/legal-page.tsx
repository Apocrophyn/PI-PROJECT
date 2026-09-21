import type { ReactNode } from "react"
import Link from "next/link"
import { PageIntro } from "@/components/site/page-intro"
import { SectionReveal } from "@/components/site/section-reveal"

/** Shared shell for the policy pages: intro, contents list, then the numbered sections. */
export function LegalPage({
  accent,
  title,
  description,
  updated,
  sections,
}: {
  accent: string
  title: Parameters<typeof PageIntro>[0]["title"]
  description: string
  updated: string
  sections: { id: string; heading: string; body: ReactNode }[]
}) {
  return (
    <div className="bg-[#050708]">
      <PageIntro accent={accent} title={title} description={description} />
      <section className="page-section">
        <div className="site-shell grid gap-12 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-16">
          <aside className="md:sticky md:top-[calc(var(--header-h)+3rem)] md:self-start">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/45">Last updated</p>
            <p className="mt-2 font-display text-xl text-[#f0eee6]">{updated}</p>
            <nav aria-label="On this page" className="mt-8 border-t border-white/10">
              <ol className="space-y-0">
                {sections.map((section, index) => (
                  <li key={section.id} className="border-b border-white/10">
                    <a href={`#${section.id}`} className="group flex min-h-11 items-baseline gap-3 py-3.5 text-sm text-foreground/75 transition-colors hover:text-primary">
                      <span className="text-[0.62rem] font-bold tabular-nums tracking-[0.14em] text-primary">{String(index + 1).padStart(2, "0")}</span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <p className="mt-8 text-sm leading-7 text-muted-foreground">
              Questions about this page? <Link href="/contact" className="text-primary underline underline-offset-4">Get in touch</Link>.
            </p>
          </aside>

          <div className="article-prose max-w-[48rem]">
            {sections.map((section, index) => (
              <SectionReveal key={section.id} delay={Math.min(index, 4) * 0.04}>
                <section id={section.id} className="scroll-mt-28 border-t border-white/10 pt-10 first:border-t-0 first:pt-0 [&:not(:first-child)]:mt-14">
                  <h2 className="!mt-0 flex items-baseline gap-4">
                    <span className="font-sans text-[0.7rem] font-bold tabular-nums tracking-[0.16em] text-primary">{String(index + 1).padStart(2, "0")}</span>
                    {section.heading}
                  </h2>
                  {section.body}
                </section>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

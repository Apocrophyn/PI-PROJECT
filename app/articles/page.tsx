import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageIntro } from "@/components/site/page-intro"
import { SectionReveal } from "@/components/site/section-reveal"
import { ClosingCta } from "@/components/site/closing-cta"
import { ArticleCard, ArticleLead } from "@/components/site/article-card"
import { articles } from "@/content/articles"
import { breadcrumbs, JsonLd, pageMetadata } from "@/lib/seo"
import { cn } from "@/lib/utils"

export const metadata = pageMetadata({
  title: "Revision & Exam Guides",
  ogTitle: "Articles: GCSE & A-Level Maths and Science Guides",
  description: "Revision plans, exam technique and subject guidance for KS3, GCSE and A-Level maths and science, written by qualified UK teachers.",
  path: "/articles",
  keywords: ["gcse revision guides", "a level maths help", "gcse science revision", "uk tutoring advice"],
})

export default function ArticlesPage() {
  const lead = articles[0]
  const grid = articles.slice(1)
  const total = articles.length

  return (
    <div className="bg-[#050708]">
      <PageIntro
        accent="Articles"
        title={["Teaching notes, written ", { text: "out loud.", className: "italic", base: "#78ddea" }]}
        description="Explanations, exam guidance and the thinking behind how we teach. Written by the tutors who use it in sessions."
        side={total === 0 ? undefined : (
          <dl className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
            <div>
              <dt className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/45">Published</dt>
              <dd className="mt-2 font-display text-4xl tabular-nums">{total}</dd>
            </div>
            <div>
              <dt className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/45">Written by</dt>
              <dd className="mt-2 font-display text-4xl">Our tutors</dd>
            </div>
          </dl>
        )}
      />

      <section className="page-section">
        <div className="site-shell">
          {articles.length === 0 ? (
            <div className="max-w-xl">
              <h2 className="section-title">Nothing published <span className="italic text-primary">yet.</span></h2>
              <p className="body-large mt-6">The first teaching notes are being written. In the meantime, tell us what you would like explained.</p>
              <Link href="/contact" className="lg mt-8 inline-flex h-12 items-center gap-2.5 rounded-full px-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em]">
                Ask a question <ArrowRight data-icon className="size-4" />
              </Link>
            </div>
          ) : (
            <>
              {lead && <SectionReveal><ArticleLead article={lead} /></SectionReveal>}
              {grid.length > 0 && (
                <div className={cn("grid gap-6 md:grid-cols-2 xl:grid-cols-3", lead && "mt-6")}>
                  {grid.map((article, index) => (
                    <SectionReveal key={article.slug} delay={(index % 3) * 0.07} className="h-full">
                      <ArticleCard article={article} />
                    </SectionReveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <ClosingCta title="A topic you want explained?" description="Tell us what keeps coming up and we will write it down properly." />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Articles", path: "/articles" }])} />
    </div>
  )
}

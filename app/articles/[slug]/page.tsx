import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { ClosingCta } from "@/components/site/closing-cta"
import { SectionReveal } from "@/components/site/section-reveal"
import { ShimmerText } from "@/components/site/shimmer-text"
import { ArticleCard } from "@/components/site/article-card"
import { ReadingProgress } from "@/components/site/reading-progress"
import { Slab } from "@/components/site/motion-kit"
import { articles } from "@/content/articles"
import { formatDate, getArticle, getRelated, readingTime } from "@/lib/articles"
import { absolute, breadcrumbs, faqGraph, JsonLd, pageMetadata, SITE } from "@/lib/seo"

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return { title: "Article not found" }
  return pageMetadata({
    title: article.metaTitle ?? article.title,
    ogTitle: article.title,
    description: article.description,
    path: `/articles/${article.slug}`,
    image: article.image,
    imageAlt: article.imageAlt,
    type: "article",
    keywords: article.keywords,
    publishedTime: article.published,
    modifiedTime: article.updated ?? article.published,
    authors: [article.author],
  })
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()
  const related = getRelated(slug)
  const minutes = readingTime(article.body)

  const articleGraph = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: absolute(article.image),
    datePublished: article.published,
    dateModified: article.updated ?? article.published,
    author: { "@type": "Person", name: article.author, url: absolute("/tutors") },
    publisher: { "@id": `${SITE.url}/#organisation` },
    mainEntityOfPage: absolute(`/articles/${article.slug}`),
    inLanguage: "en-GB",
    wordCount: article.body.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length,
    keywords: article.keywords.join(", "),
    about: article.topic,
    timeRequired: `PT${minutes}M`,
  }

  return (
    <div className="bg-[#050708]">
      <ReadingProgress />

      <article>
        <header className="relative overflow-hidden border-b border-white/[0.08] pb-14 pt-12 md:pb-20 md:pt-16">
          <div aria-hidden="true" className="pointer-events-none absolute right-[4%] top-[6%] font-display text-[clamp(12rem,30vw,30rem)] italic leading-none text-white/[0.022]">π</div>
          <div className="site-shell relative">
            <nav aria-label="Breadcrumb" className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/45">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="inline-flex min-h-11 items-center transition-colors hover:text-primary">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/articles" className="inline-flex min-h-11 items-center transition-colors hover:text-primary">Articles</Link></li>
                <li aria-hidden="true">/</li>
                <li className="inline-flex min-h-11 items-center text-primary">{article.topic}</li>
              </ol>
            </nav>
            <ShimmerText
              as="h1"
              intro
              introDelay={120}
              shineDelay={1600}
              segments={article.title}
              className="mt-8 block max-w-[20ch] font-display text-[clamp(2.4rem,5.2vw,4.8rem)] leading-[0.98] tracking-[-0.04em]"
            />
            <p className="body-large mt-8 max-w-2xl opacity-0 [animation:letter-in_1s_var(--ease-out)_0.5s_both]">{article.description}</p>
            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-6 opacity-0 [animation:letter-in_1s_var(--ease-out)_0.6s_both]">
              {[
                ["Written by", article.author],
                ["Published", formatDate(article.published)],
                ...(article.updated ? [["Updated", formatDate(article.updated)]] : []),
                ["Reading time", `${minutes} minutes`],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/45">{label}</dt>
                  <dd className="mt-2 font-display text-lg text-[#f0eee6] md:text-xl">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <div className="site-shell pt-10 md:pt-14">
          <SectionReveal>
            <Slab radius={24} depth={18} lift={false} faceClassName="p-2.5">
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-[#080d10]">
                <Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 1439px) 100vw, 88rem" priority className="object-cover" />
              </div>
            </Slab>
          </SectionReveal>
        </div>

        <div className="site-shell grid gap-12 py-16 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-16 md:py-24">
          <aside className="md:sticky md:top-[calc(var(--header-h)+3rem)] md:self-start">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-primary">{article.topic}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Mathematics and science tutoring for KS3, GCSE and A-Level, online and around Rotherham and Birmingham.</p>
            <Link href="/contact" className="lg mt-6 inline-flex h-11 items-center gap-2.5 rounded-full px-5 text-[0.68rem] font-semibold uppercase tracking-[0.14em]">
              Book a session <ArrowUpRight data-icon className="size-3.5" />
            </Link>
            <Link href="/articles" className="mt-4 inline-flex min-h-11 items-center gap-2.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/50 transition-colors duration-300 hover:text-primary">
              <ArrowLeft className="size-3.5" /> All articles
            </Link>
          </aside>

          <div>
            <div className="article-prose" dangerouslySetInnerHTML={{ __html: article.body }} />

            {article.faqs && article.faqs.length > 0 && (
              <section className="mt-20 max-w-[46rem] border-t border-white/10 pt-10">
                <h2 className="font-display text-[clamp(1.9rem,3vw,2.5rem)] leading-[1.08] tracking-[-0.03em] text-[#f0eee6]">Common questions</h2>
                <dl className="mt-8 border-b border-white/10">
                  {article.faqs.map((faq) => (
                    <div key={faq.question} className="border-t border-white/10 py-6">
                      <dt className="font-display text-xl text-[#f0eee6] md:text-2xl">{faq.question}</dt>
                      <dd className="mt-3 text-base leading-8 text-muted-foreground">{faq.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="page-section border-t border-white/[0.08] bg-[#070a0c]">
          <div className="site-shell">
            <SectionReveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="section-title max-w-[14ch]">Keep <span className="italic text-primary">reading.</span></h2>
              <Link href="/articles" className="inline-flex min-h-11 items-center text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/55 transition-colors duration-300 hover:text-primary">All articles</Link>
            </SectionReveal>
            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item, index) => (
                <SectionReveal key={item.slug} delay={index * 0.07} className="h-full">
                  <ArticleCard article={item} />
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ClosingCta title="Still stuck on the topic?" description="Send us the question. We will point you at the right explanation and the right tutor." />

      <JsonLd data={articleGraph} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Articles", path: "/articles" }, { name: article.title, path: `/articles/${article.slug}` }])} />
      {article.faqs && article.faqs.length > 0 && <JsonLd data={faqGraph(article.faqs)} />}
    </div>
  )
}

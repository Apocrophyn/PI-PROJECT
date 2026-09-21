import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Slab } from "@/components/site/motion-kit"
import type { Article } from "@/content/articles"
import { excerpt, formatDate, readingTime } from "@/lib/articles"
import { cn } from "@/lib/utils"

function Cover({ article, sizes, className }: { article: Article; sizes: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-[#080d10]", className)}>
      {article.image ? (
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
      ) : (
        // No cover uploaded: fall back to the wordmark rather than a broken frame.
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_100%_at_50%_0%,#121a1e,#05080a_70%)]">
          <span className="font-display text-[clamp(4rem,12vw,9rem)] italic leading-none text-white/[0.07]">π</span>
        </div>
      )}
      <div aria-hidden="true" className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
    </div>
  )
}

function Meta({ article, className }: { article: Article; className?: string }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/45", className)}>
      <time dateTime={article.published}>{formatDate(article.published)}</time>
      <span aria-hidden="true">·</span>
      <span className="text-primary">{article.author}</span>
      <span aria-hidden="true">·</span>
      <span>{readingTime(article.body)} min read</span>
    </p>
  )
}

/** The newest article, given the width to act as the entry point. */
export function ArticleLead({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <Slab radius={24} depth={18} faceClassName="grid gap-8 p-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:items-center md:gap-12 md:p-8">
        <Cover article={article} sizes="(max-width: 767px) 100vw, 50vw" className="aspect-[16/10]" />
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-primary">Latest · {article.topic}</p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.98] tracking-[-0.035em] text-[#f0eee6]">{article.title}</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">{excerpt(article.body, 220)}</p>
          <Meta article={article} className="mt-7" />
          <span className="lg mt-8 inline-flex h-12 items-center gap-2.5 rounded-full px-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em]">
            Read the article <ArrowUpRight data-icon className="size-4" />
          </span>
        </div>
      </Slab>
    </Link>
  )
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block h-full">
      <Slab className="h-full" radius={20} depth={16} faceClassName="flex h-full flex-col p-5 md:p-6">
        <Cover article={article} sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" className="aspect-[16/10]" />
        <h3 className="mt-6 font-display text-[1.7rem] leading-[1.06] tracking-[-0.025em] text-[#f0eee6] transition-colors duration-500 group-hover:text-primary">{article.title}</h3>
        <p className="mb-7 mt-3.5 text-sm leading-7 text-muted-foreground">{excerpt(article.body)}</p>
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/10 pt-5">
          <Meta article={article} />
          <ArrowUpRight className="size-4 shrink-0 text-white/40 transition-all duration-500 group-hover:rotate-45 group-hover:text-primary" />
        </div>
      </Slab>
    </Link>
  )
}

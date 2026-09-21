export type Faq = { question: string; answer: string }

export type Article = {
  /** URL segment. Treat as permanent: changing it breaks indexed links. */
  slug: string
  title: string
  /** Shorter title for the search result, where the suffix eats the budget. Falls back to `title`. */
  metaTitle?: string
  /** Meta description and card summary. Keep under about 155 characters. */
  description: string
  keywords: string[]
  /** Short label used on cards and in breadcrumbs. */
  topic: string
  published: string
  updated?: string
  author: string
  image: string
  imageAlt: string
  faqs?: Faq[]
  /** Article body as HTML, styled by `.article-prose`. */
  body: string
}

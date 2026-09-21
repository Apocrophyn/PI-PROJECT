import { articles, type Article } from "@/content/articles"

export type { Article }

/** Strips the body markup so a card can show a plain-text opening. */
export function excerpt(html: string, max = 168) {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&rsquo;/g, "’")
    .replace(/\s+/g, " ")
    .trim()
  if (text.length <= max) return text
  return `${text.slice(0, text.lastIndexOf(" ", max) || max)}…`
}

export function readingTime(html: string) {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

export function formatDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug) ?? null
}

/** Prefers other articles on the same topic, then falls back to the newest. */
export function getRelated(slug: string, limit = 3) {
  const current = getArticle(slug)
  const others = articles.filter((article) => article.slug !== slug)
  if (!current) return others.slice(0, limit)
  const sameTopic = others.filter((article) => article.topic === current.topic)
  return [...sameTopic, ...others.filter((article) => article.topic !== current.topic)].slice(0, limit)
}

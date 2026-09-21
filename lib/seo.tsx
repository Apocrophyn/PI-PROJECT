import type { Metadata } from "next"

export const SITE = {
  name: "PI Tutors",
  url: "https://pitutors.com",
  /** Used for the default social card and as the Organization logo. */
  ogImage: "/og.png",
  email: "info@pitutors.com",
  telephone: "+447588609243",
  telephoneDisplay: "07588 609243",
  areaServed: ["Rotherham", "Sheffield", "Birmingham", "United Kingdom"],
  description:
    "Personalised mathematics and science tutoring for KS3, GCSE and A-Level students in Rotherham, Birmingham and online.",
} as const

export const absolute = (path: string) => new URL(path, SITE.url).toString()

/** Page metadata with the canonical URL and social cards filled in consistently. */
export function pageMetadata({
  title,
  ogTitle,
  description,
  path,
  image = SITE.ogImage,
  imageAlt = "PI Tutors: mathematics and science tutoring",
  type = "website",
  keywords,
  publishedTime,
  modifiedTime,
  authors,
}: {
  title: string
  /** Social cards can carry the long headline even when the search title is trimmed. */
  ogTitle?: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  type?: "website" | "article"
  keywords?: string[]
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
}): Metadata {
  const url = absolute(path)
  const images = [{ url: absolute(image), width: 1200, height: 630, alt: imageAlt }]
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: SITE.name,
      title: ogTitle ?? title,
      description,
      images,
      locale: "en_GB",
      ...(type === "article" ? { publishedTime, modifiedTime, authors } : {}),
    },
    twitter: { card: "summary_large_image", title: ogTitle ?? title, description, images: images.map((i) => i.url) },
  }
}

const organisation = {
  "@type": "EducationalOrganization",
  "@id": `${SITE.url}/#organisation`,
  name: SITE.name,
  url: SITE.url,
  logo: { "@type": "ImageObject", url: absolute("/apple-touch-icon.png"), width: 512, height: 512 },
  image: absolute(SITE.ogImage),
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.telephone,
  areaServed: SITE.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
  address: { "@type": "PostalAddress", addressCountry: "GB", addressRegion: "South Yorkshire", addressLocality: "Rotherham" },
  knowsAbout: ["Mathematics tutoring", "Physics tutoring", "Chemistry tutoring", "Biology tutoring", "GCSE", "A-Level", "Key Stage 3"],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "10:00", closes: "16:00" },
  ],
}

const website = {
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  inLanguage: "en-GB",
  publisher: { "@id": `${SITE.url}/#organisation` },
}

/** Emitted once from the root layout; every other graph references these by id. */
export const siteGraph = { "@context": "https://schema.org", "@graph": [organisation, website] }

export const breadcrumbs = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absolute(item.path),
  })),
})

export const faqGraph = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
})

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

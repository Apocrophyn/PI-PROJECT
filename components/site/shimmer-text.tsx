import type { CSSProperties, ElementType } from "react"
import { cn } from "@/lib/utils"

type Segment = string | { text: string; className?: string; base?: string }

type ShimmerTextProps = {
  segments: Segment[] | string
  as?: ElementType
  className?: string
  intro?: boolean
  introDelay?: number
  shineDelay?: number
  cycle?: number
  step?: number
  base?: string
}

// Renders text as individual letters so a light can pass through one letter at a time.
export function ShimmerText({ segments, as: Tag = "span", className, intro = false, introDelay = 0, shineDelay = 1400, cycle = 7, step = 55, base = "#f0eee6" }: ShimmerTextProps) {
  const parts = (typeof segments === "string" ? [segments] : segments).map((segment) =>
    typeof segment === "string" ? { text: segment, className: undefined, base: undefined } : segment,
  )
  const label = parts.map((part) => part.text).join("")
  let index = 0

  return (
    <Tag
      className={cn(intro && "shimmer-intro", className)}
      style={{ "--shine-delay": `${shineDelay}ms`, "--shine-cycle": `${cycle}s`, "--shine-step": `${step}ms`, "--intro-delay": `${introDelay}ms`, "--shine-base": base } as CSSProperties}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">
        {parts.map((part, partIndex) => (
          <span key={partIndex} className={part.className} style={part.base ? ({ "--shine-base": part.base } as CSSProperties) : undefined}>
            {part.text.split(/(\s+)/).map((word, wordIndex) => {
              if (/^\s+$/.test(word)) return <span key={wordIndex}>{word}</span>
              if (!word) return null
              return (
                <span key={wordIndex} className="shimmer-word">
                  {Array.from(word).map((letter, letterIndex) => {
                    const i = index++
                    return (
                      <span key={letterIndex} className="shimmer-letter" style={{ "--i": i } as CSSProperties}>
                        {letter}
                      </span>
                    )
                  })}
                </span>
              )
            })}
          </span>
        ))}
      </span>
    </Tag>
  )
}

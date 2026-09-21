"use client"

import { useEffect, useState } from "react"
import { CinematicHero, type HeroVariant } from "@/components/site/cinematic-hero"

const VARIANTS: HeroVariant[] = ["panes", "chrome", "lens"]

/**
 * Renders the default hero on the server so the homepage stays static, then swaps in an
 * alternate storyboard after mount if `?hero=` asks for one. The preview URLs still work
 * and the crawler still gets real HTML.
 */
export function HeroMount() {
  const [variant, setVariant] = useState<HeroVariant>("panes")

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("hero")
    if (requested && VARIANTS.includes(requested as HeroVariant) && requested !== variant) {
      setVariant(requested as HeroVariant)
    }
  }, [variant])

  return <CinematicHero key={variant} variant={variant} />
}

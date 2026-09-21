"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

export function useSafeReducedMotion() {
  const preference = useReducedMotion()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => setHydrated(true), [])

  return hydrated && Boolean(preference)
}

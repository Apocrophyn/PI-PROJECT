"use client"

/**
 * Shared "is the page moving right now" flag. Decorative canvases use it to stand down
 * while the main thread is busy scrolling, which is exactly when jank is visible.
 */
let scrolling = false
let timer = 0
let listeners = 0

const onScroll = () => {
  scrolling = true
  window.clearTimeout(timer)
  timer = window.setTimeout(() => { scrolling = false }, 140)
}

export function watchScrolling() {
  if (listeners === 0) window.addEventListener("scroll", onScroll, { passive: true })
  listeners += 1
  return () => {
    listeners -= 1
    if (listeners === 0) {
      window.removeEventListener("scroll", onScroll)
      window.clearTimeout(timer)
      scrolling = false
    }
  }
}

export const isScrolling = () => scrolling

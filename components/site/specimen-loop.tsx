"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

/**
 * The still is always painted; the matching clip mounts shortly before the card reaches
 * the viewport and fades in over it. Once it has shown a frame it stays on top, so
 * scrolling away and back does not flick the card between video and photograph.
 * Reduced motion and data-saver keep the still.
 */
export function SpecimenLoop({ poster, src, alt, sizes }: { poster: string; src: string; alt: string; sizes: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mounted, setMounted] = useState(false)
  const [inView, setInView] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setMounted(true)
      },
      { rootMargin: "500px 0px" },
    )
    observer.observe(hostRef.current!)
    return () => observer.disconnect()
  }, [])

  // The element does not exist on the tick the observer first fires, so drive playback
  // from state instead of from inside the callback.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (inView) video.play().catch(() => {})
    else video.pause()
  }, [inView, mounted])

  return (
    <div ref={hostRef} className="absolute inset-0">
      <Image src={poster} alt={alt} fill sizes={sizes} className="object-cover" />
      {mounted && (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => { if (inView) videoRef.current?.play().catch(() => {}) }}
          onPlaying={() => setStarted(true)}
          className="absolute inset-0 size-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: started ? 1 : 0 }}
        />
      )}
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { PiLogo } from "@/components/site/pi-mark"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Tutors", href: "/tutors" },
  { name: "Articles", href: "/articles" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const isHome = pathname === "/"

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      if (y > 480 && y > last + 4) setHidden(true)
      else if (y < last - 4 || y <= 480) setHidden(false)
      last = y
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const active = navItems.find((item) => pathname.startsWith(item.href))?.href
  const indicator = hovered ?? active

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled || !isHome ? "border-b border-white/[0.08] bg-[#050708]/[0.86]" : "border-b border-transparent bg-transparent",
          hidden && "-translate-y-full",
        )}
      >
        <div className="site-shell flex h-full items-center justify-between gap-4">
          <Link href="/" aria-label="PI Tutors home" className="shrink-0">
            <PiLogo animated />
          </Link>

          <nav aria-label="Main navigation" className="hidden md:block" onMouseLeave={() => setHovered(null)}>
            <ul className="flex items-center gap-1 rounded-full border border-white/[0.09] bg-[#0a0f12]/80 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              {navItems.map((item) => (
                <li key={item.href} className="relative">
                  {indicator === item.href && (
                    <motion.span layoutId="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 34 }} className="lg absolute inset-0 rounded-full" />
                  )}
                  <Link
                    href={item.href}
                    onMouseEnter={() => setHovered(item.href)}
                    aria-current={active === item.href ? "page" : undefined}
                    className={cn(
                      "relative z-10 block rounded-full px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
                      indicator === item.href ? "text-[#f0eee6]" : "text-white/55 hover:text-white/90",
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block">
            <Button variant="ivory" size="sm" asChild>
              <Link href="/contact">Book a tutor <ArrowUpRight data-icon /></Link>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="glass" size="icon" className="md:hidden" aria-label="Open navigation"><Menu data-icon /></Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col border-white/10 bg-[#050708] p-7">
              <SheetHeader className="border-b border-white/10 pb-6 text-left">
                <SheetTitle><PiLogo /></SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="flex flex-col py-6">
                {[{ name: "Home", href: "/" }, ...navItems].map((item, index) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-baseline justify-between border-b border-white/10 py-4 opacity-0 [animation:letter-in_0.8s_var(--ease-out)_both]"
                      style={{ animationDelay: `${120 + index * 60}ms` }}
                    >
                      <span className="font-display text-4xl tracking-[-0.03em] text-[#f0eee6] transition-colors group-hover:text-primary">{item.name}</span>
                      <span className="text-[0.65rem] font-bold tracking-[0.16em] text-white/40">0{index + 1}</span>
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto">
                <Button variant="ivory" size="lg" className="w-full" asChild><Link href="/contact">Book a tutor <ArrowUpRight data-icon /></Link></Button>
                <div className="mt-5 flex justify-center"><Link href="/admin/login" className="text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground">Admin</Link></div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      {!isHome && <div aria-hidden="true" className="h-[var(--header-h)]" />}
    </>
  )
}

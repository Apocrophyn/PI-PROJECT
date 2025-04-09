"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Tutors", href: "/tutors" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user || null)
    }
    checkUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-gray-900/90 backdrop-blur-md shadow-md" : "bg-gray-900",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 transition-transform duration-300 hover:scale-110">
                <Image src="/images/pi-circle-logo.svg" alt="PI Tutors Logo" fill className="object-contain" priority />
              </div>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-bold text-white"
              >
                PI TUTORS
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition duration-500 hover:scale-105 transform-gpu"></div>
                <Link
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300",
                    pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-gray-300 hover:text-primary group-hover:bg-primary/5",
                  )}
                >
                  {item.name}
                  <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <Button className="relative ml-4 bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105 transform-gpu" size="sm" asChild>
                <Link href="/contact">Book a Tutor</Link>
              </Button>
            </motion.div>
            {user ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <Button 
                  variant="outline" 
                  className="ml-4" 
                  size="sm"
                  onClick={() => router.push('/admin/dashboard')}
                >
                  Admin Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  className="ml-2" 
                  size="sm"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <Button 
                  variant="outline" 
                  className="ml-4" 
                  size="sm"
                  onClick={() => router.push('/admin/login')}
                >
                  Admin Login
                </Button>
              </motion.div>
            )}
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden">
            <button type="button" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-800"
        >
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-3 py-2 text-base font-medium rounded-md",
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-gray-300 hover:text-primary hover:bg-primary/10",
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button className="mt-4 w-full bg-primary hover:bg-primary/90 text-white" size="sm" asChild>
              <Link href="/contact">Book a Tutor</Link>
            </Button>
            {user ? (
              <>
                <Button 
                  className="mt-2 w-full" 
                  size="sm"
                  onClick={() => router.push('/admin/dashboard')}
                >
                  Admin Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  className="mt-2 w-full" 
                  size="sm"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                className="mt-2 w-full" 
                size="sm"
                onClick={() => router.push('/admin/login')}
              >
                Admin Login
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </header>
  )
}


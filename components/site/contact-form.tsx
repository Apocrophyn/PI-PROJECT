"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ArrowUpRight, Loader2 } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Slab } from "@/components/site/motion-kit"

const services = [
  ["ks3-maths", "KS3 Mathematics (£35/hour)"],
  ["ks3-physics", "KS3 Physics (£35/hour)"],
  ["ks3-chemistry", "KS3 Chemistry (£35/hour)"],
  ["ks3-biology", "KS3 Biology (£35/hour)"],
  ["gcse-maths", "GCSE Mathematics (£35/hour)"],
  ["gcse-physics", "GCSE Physics (£35/hour)"],
  ["gcse-chemistry", "GCSE Chemistry (£35/hour)"],
  ["gcse-biology", "GCSE Biology (£35/hour)"],
  ["alevel-maths", "A-Level Mathematics (£50/hour)"],
  ["alevel-physics", "A-Level Physics (£50/hour)"],
  ["small-group", "Small Group Sessions (£25/hour)"],
  ["other", "Other"],
] as const

const initial = { name: "", email: "", phone: "", subject: "", message: "", contactPreference: "email", service: "" }

function Field({ id, label, textarea, className, ...props }: { id: string; label: string; textarea?: boolean; className?: string } & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const Tag = textarea ? "textarea" : "input"
  return (
    <div className={cn("group relative", className)}>
      <Tag id={id} name={id} placeholder=" " className={cn("field peer", textarea && "min-h-36 resize-none")} {...(props as object)} />
      <label htmlFor={id} className="pointer-events-none absolute left-0 top-1 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-white/50 transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-[0.66rem] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-primary">
        {label}
      </label>
      <span aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-white to-secondary transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:scale-x-100" />
    </div>
  )
}

export function ContactForm() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  useEffect(() => {
    const subject = new URLSearchParams(window.location.search).get("subject")
    if (subject) setForm((prev) => ({ ...prev, subject: `${subject} tutoring` }))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const response = await fetch("/api/send", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, submitted: false }) })
      if (!response.ok) throw new Error("Failed to send message")
      setStatus("sent")
      setForm(initial)
    } catch (error) {
      console.error("Error sending message:", error)
      setStatus("error")
    }
  }

  return (
    <Slab radius={30} depth={12} lift={false} faceClassName="relative overflow-hidden p-6 md:p-10">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div key="sent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="flex min-h-[32rem] flex-col items-center justify-center text-center" role="status">
            <svg viewBox="0 0 80 80" className="size-24" aria-hidden="true">
              <motion.circle cx="40" cy="40" r="36" fill="none" stroke="#78ddea" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} />
              <motion.path d="M25 41 l10 10 l21 -22" fill="none" stroke="#f0eee6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }} />
            </svg>
            <h3 className="mt-8 font-display text-4xl">Message sent.</h3>
            <p className="mt-3 max-w-sm text-muted-foreground">Thank you for getting in touch. We’ll get back to you shortly to arrange a suitable time.</p>
            <Button variant="glass" className="mt-8" onClick={() => setStatus("idle")}>Send another message</Button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -12 }} className="relative space-y-7">
            <div className="grid gap-7 sm:grid-cols-2">
              <Field id="name" label="Full name" value={form.name} onChange={handleChange} required autoComplete="name" />
              <Field id="email" label="Email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" />
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              <Field id="phone" label="Phone (optional)" type="tel" value={form.phone} onChange={handleChange} autoComplete="tel" />
              <div className="relative">
                <label htmlFor="service" className="absolute left-0 top-1 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-white/50">Service</label>
                <Select value={form.service} onValueChange={(value) => setForm({ ...form, service: value })}>
                  <SelectTrigger id="service" className="h-auto rounded-none border-0 border-b border-white/15 bg-transparent px-0 pb-3 pt-7 text-base text-[#f0eee6] shadow-none focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-white/40">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#0a0f12] text-[#f0eee6]">
                    {services.map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Field id="subject" label="Subject" value={form.subject} onChange={handleChange} required />
            <Field id="message" label="Where does learning feel stuck?" textarea value={form.message} onChange={handleChange} required />

            <fieldset>
              <legend className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-white/50">Preferred contact method</legend>
              <div className="mt-4 inline-flex rounded-full border border-white/10 bg-black/30 p-1">
                {(["email", "phone"] as const).map((option) => (
                  <label key={option} className="relative cursor-pointer">
                    <input type="radio" name="contactPreference" value={option} checked={form.contactPreference === option} onChange={() => setForm({ ...form, contactPreference: option })} className="peer sr-only" />
                    {form.contactPreference === option && <motion.span layoutId="pref-pill" className="lg absolute inset-0 rounded-full" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                    <span className="relative z-10 block rounded-full px-6 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/60 transition-colors peer-checked:text-[#f0eee6] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary">{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {status === "error" && <p role="alert" className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">We couldn’t send your message. Please try again, or email info@pitutors.com.</p>}

            <Button type="submit" variant="ivory" size="lg" className="w-full" disabled={status === "sending"}>
              {status === "sending" ? <><Loader2 className="animate-spin" /> Sending</> : <>Send message <ArrowUpRight data-icon /></>}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </Slab>
  )
}

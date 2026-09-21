import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ShimmerText } from "@/components/site/shimmer-text"
import { SectionReveal } from "@/components/site/section-reveal"
import { ContactForm } from "@/components/site/contact-form"
import { Slab } from "@/components/site/motion-kit"
import { ContactSignal } from "@/components/site/contact-signal"
import { breadcrumbs, faqGraph, JsonLd, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Contact & Book a Tutor",
  ogTitle: "Contact: Book a Maths or Science Tutor",
  description: "Arrange KS3, GCSE or A-Level tutoring in Rotherham, Birmingham or online. Call 07588 609243, email us, or send an enquiry and we will reply promptly.",
  path: "/contact",
  keywords: ["book a tutor", "maths tutor near me", "contact tutor rotherham", "tutor birmingham enquiry", "gcse tutoring enquiry"],
})

const channels = [
  { icon: Phone, label: "Call", value: "07588 609243", href: "tel:+447588609243" },
  { icon: Mail, label: "Email", value: "info@pitutors.com", href: "mailto:info@pitutors.com" },
  { icon: MapPin, label: "Where", value: "Rotherham, Birmingham & online" },
  { icon: Clock, label: "Hours", value: "Mon–Fri 9am–8pm · Sat 10am–4pm" },
]

const faqs = [
  { question: "How do I schedule a tutoring session?", answer: "Fill out the contact form, call us directly or send an email. We’ll get back to you promptly to arrange a suitable time." },
  { question: "What are your tutoring rates?", answer: "A-Level one-to-one tutoring is £50 per hour, GCSE and KS3 one-to-one tutoring is £35 per hour, and small-group sessions (up to four students) are £25 per hour per student." },
  { question: "Do you offer online tutoring?", answer: "Yes. We offer in-person tutoring in Rotherham and Birmingham as well as online tutoring. Online sessions are interactive and include digital whiteboards." },
  { question: "How long are the tutoring sessions?", answer: "Standard sessions are 60 minutes. We can arrange 90-minute or two-hour sessions for more intensive study, particularly for A-Level students or exam preparation." },
  { question: "Can I cancel or reschedule a session?", answer: "Yes. With at least 24 hours’ notice there is no charge. Cancellations with less notice may incur a fee." },
  { question: "Do you provide learning materials?", answer: "Yes. Tutors provide worksheets, practice problems and study guides tailored to each student’s needs and curriculum." },
]

export default function ContactPage() {
  return (
    <div className="bg-[#050708]">
      <section className="relative overflow-hidden border-b border-white/[0.08] pb-20 pt-14 md:pb-28 md:pt-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[58%] h-px origin-left bg-gradient-to-r from-transparent via-primary/35 to-transparent [animation:grow-x_1.8s_var(--ease-out)_0.3s_both]" />
        <div className="site-shell grid gap-14 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-20">
          <div>
            <p className="eyebrow opacity-0 [animation:letter-in_0.9s_var(--ease-out)_both]">Contact PI Tutors</p>
            <ShimmerText
              as="h1"
              intro
              introDelay={120}
              shineDelay={1600}
              segments={["Tell us where learning feels ", { text: "stuck.", className: "italic", base: "#78ddea" }]}
              className="mt-6 block max-w-[12ch] font-display text-[clamp(3.4rem,8vw,7.8rem)] leading-[0.9] tracking-[-0.05em]"
            />
            <p className="body-large mt-8 max-w-xl opacity-0 [animation:letter-in_1s_var(--ease-out)_0.5s_both]">Share the subject, level and what currently feels difficult. We’ll help you find the right tutor, format and starting point.</p>

            <ul className="mt-12 border-b border-white/10">
              {channels.map((channel, index) => {
                const inner = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 text-primary transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(120,221,234,0.3)]"><channel.icon className="size-4" /></span>
                    <span className="w-16 shrink-0 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/45">{channel.label}</span>
                    <span className="min-w-0 flex-1 font-display text-xl text-[#f0eee6] md:text-2xl">{channel.value}</span>
                    {channel.href && <ArrowUpRight className="size-4 shrink-0 text-white/40 transition-all duration-500 group-hover:rotate-45 group-hover:text-primary" />}
                    <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary to-secondary transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                  </>
                )
                return (
                  <li key={channel.label} className="border-t border-white/10 opacity-0 [animation:letter-in_0.9s_var(--ease-out)_both]" style={{ animationDelay: `${650 + index * 90}ms` }}>
                    {channel.href ? (
                      <a href={channel.href} className="group relative flex items-center gap-4 py-5">{inner}</a>
                    ) : (
                      <div className="group relative flex items-center gap-4 py-5">{inner}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="relative">
            <Slab radius={24} depth={18} lift={false} faceClassName="p-2.5">
              <ContactSignal className="aspect-[4/5] overflow-hidden rounded-lg bg-[radial-gradient(120%_80%_at_50%_10%,#0e171b,#040709_65%)]" />
            </Slab>
            <div className="absolute -left-4 bottom-10 rounded-2xl border border-white/10 bg-[#0a0f12]/95 px-5 py-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] [animation:float_8s_ease-in-out_infinite] md:-left-10">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-primary">Tutor availability</p>
              <p className="mt-1 font-display text-2xl">Evenings from 6pm</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-form" className="page-section scroll-mt-20">
        <div className="site-shell grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <SectionReveal className="md:sticky md:top-[calc(var(--header-h)+3rem)] md:self-start">
            <p className="eyebrow">Send a message</p>
            <h2 className="section-title mt-6">Start with a <span className="italic text-primary">conversation.</span></h2>
            <p className="body-large mt-6">Tell us a little about the student and we’ll get back to you to arrange a suitable time.</p>
          </SectionReveal>
          <SectionReveal delay={0.1}><ContactForm /></SectionReveal>
        </div>
      </section>

      <section className="page-section border-t border-white/[0.08] bg-[#070a0c]">
        <div className="site-shell grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <SectionReveal>
            <p className="eyebrow">Questions</p>
            <h2 className="section-title mt-6">Good to <span className="italic text-primary">know.</span></h2>
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <Accordion type="single" collapsible defaultValue="faq-0" className="border-b border-white/10">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`} className="border-t border-white/10 border-b-0">
                  <AccordionTrigger className="gap-6 py-6 text-left font-display text-xl text-[#f0eee6] hover:no-underline md:text-2xl [&>svg]:size-5 [&>svg]:text-primary">
                    <span className="flex items-baseline gap-5"><span className="font-sans text-[0.65rem] font-bold tracking-[0.16em] text-primary">0{index + 1}</span>{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-7 pl-10 text-base leading-8 text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SectionReveal>
        </div>
      </section>

      <JsonLd data={faqGraph(faqs)} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </div>
  )
}

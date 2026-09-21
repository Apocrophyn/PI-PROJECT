"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { Slab } from "@/components/site/motion-kit"
import { SpecimenLoop } from "@/components/site/specimen-loop"
import { subjectGroups, stageNotes } from "@/lib/site-data"

const EASE = [0.16, 1, 0.3, 1] as const

// One slab per subject: the specimen wipes open, then each line rises from behind its mask.
export function SubjectRows() {
  const reduce = useReducedMotion()

  return (
    <div className="space-y-6 md:space-y-8">
      {subjectGroups.map((subject, index) => (
        <motion.article
          key={subject.title}
          initial={reduce ? false : "rest"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
          className="group/row"
        >
          <Slab radius={22} depth={18} faceClassName="grid gap-8 p-6 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:items-center md:gap-12 md:p-8 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)_minmax(0,18rem)]">
            <motion.div
              variants={{ rest: { clipPath: "inset(0% 0% 88% 0%)" }, shown: { clipPath: "inset(0% 0% 0% 0%)" } }}
              transition={{ duration: 1.1, ease: EASE }}
              className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#05080a]"
            >
              <motion.div
                variants={{ rest: { scale: 1.18 }, shown: { scale: 1 } }}
                transition={{ duration: 1.5, ease: EASE }}
                className="absolute inset-0"
              >
                <SpecimenLoop
                  poster={subject.jar}
                  src={subject.jarVideo}
                  alt={`${subject.title} specimen: a lit glass bell jar in the PI Tutors laboratory`}
                  sizes="(max-width: 767px) 100vw, 17rem"
                />
              </motion.div>
            </motion.div>

            <div>
              {[
                <span key="meta" className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-primary">{subject.number} · {subject.levels}</span>,
                <h3 key="title" className="mt-4 font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.92] tracking-[-0.04em] text-[#f0eee6]">{subject.title}</h3>,
                <p key="detail" className="mt-5 max-w-md text-base leading-8 text-muted-foreground">{subject.detail}</p>,
                <ul key="topics" className="mt-6 flex max-w-lg flex-wrap gap-2">
                  {subject.topics.map((topic) => (
                    <li key={topic} className="rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-white/70">{topic}</li>
                  ))}
                </ul>,
                <Link key="cta" href={`/contact?subject=${encodeURIComponent(subject.title)}#contact-form`} className="lg mt-7 inline-flex h-12 items-center gap-2.5 rounded-full px-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em]">
                  Enquire about {subject.title} <ArrowUpRight data-icon className="size-4" />
                </Link>,
              ].map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.12em]">
                  <motion.span
                    variants={{ rest: { y: "110%" }, shown: { y: "0%" } }}
                    transition={{ duration: 0.95, ease: EASE, delay: 0.12 + i * 0.07 }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </div>

            <ul className="grid gap-px overflow-hidden rounded-xl bg-white/10 lg:mt-0">
              {subject.stages.map((stage, i) => (
                <motion.li
                  key={stage}
                  variants={{ rest: { opacity: 0, x: 18 }, shown: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.45 + i * 0.1 }}
                  className="bg-[#0a0f12] p-5"
                >
                  <p className="font-display text-2xl text-[#f0eee6]">{stage}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{stageNotes[stage]}</p>
                </motion.li>
              ))}
            </ul>
          </Slab>
        </motion.article>
      ))}
    </div>
  )
}

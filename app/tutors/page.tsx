"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function TutorsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.2),transparent_50%)]"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Our Tutors
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Meet Our Expert Tutors</h1>
            <p className="mt-4 text-lg text-gray-300">
              Our team of highly qualified tutors is passionate about education and committed to helping students
              achieve their full potential.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tutors Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-16">
            <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                <div className="col-span-1">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <Image
                      src="/images/tutor-taimur.png"
                      alt="Dr. Muhammad Taimur Khan"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="col-span-1 lg:col-span-2 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white">Dr. Muhammad Taimur Khan</h3>
                  <p className="mt-2 text-primary font-medium">Mathematics Specialist</p>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-white">Qualifications</h4>
                      <p className="mt-1 text-sm text-gray-400">
                        PhD, PGCert, MSc in Business and Management, Sheffield Hallam University; BEng Chemical and
                        Process Engineering, University of Sheffield
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Experience</h4>
                      <p className="mt-1 text-sm text-gray-400">
                        Maths teacher and Second in Department in a Secondary school with an excellent reputation;
                        previously an Associate Lecturer at Sheffield Hallam University.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Subjects Offered</h4>
                      <p className="mt-1 text-sm text-gray-400">KS3, GCSE and A Levels Maths</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Availability</h4>
                      <p className="mt-1 text-sm text-gray-400">Evenings from 6pm, Rotherham & Online</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-400">
                    Taimur is passionate about inspiring students by reminding them about the amazing careers these
                    subjects will lead to and how they develop our problem solving and analytical skills.
                  </p>
                  <div className="mt-6">
                    <Button asChild>
                      <Link href="/contact">
                        Book a Session with Dr. Khan
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                <div className="col-span-1">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <Image src="/images/tutor-mukarram.png" alt="Mr. Muhammad Mukarram" fill className="object-cover" />
                  </div>
                </div>
                <div className="col-span-1 lg:col-span-2 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white">Mr. Muhammad Mukarram</h3>
                  <p className="mt-2 text-primary font-medium">Physics & Mathematics Specialist</p>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-white">Qualifications</h4>
                      <p className="mt-1 text-sm text-gray-400">
                        PGDE (Physics with Maths | University of Sheffield, MSc Nanoscience and Engineering | NUST, BSc
                        Materials Engineering | NUST
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Experience</h4>
                      <p className="mt-1 text-sm text-gray-400">
                        Physics and Maths teacher at an Engineering College in Birmingham. Member and scholar at
                        Institute of Physics (IOP). IGCSE Physics Examiner.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Subjects Offered</h4>
                      <p className="mt-1 text-sm text-gray-400">
                        KS5 Physics, Maths and Further Maths | GCSE Physics, Maths and Further Maths
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Availability</h4>
                      <p className="mt-1 text-sm text-gray-400">Evenings from 6pm, Birmingham & Online</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-400">
                    Muhammad is passionate about inspiring students by boosting their confidence through development of
                    problem solving and analytical skills.
                  </p>
                  <div className="mt-6">
                    <Button asChild>
                      <Link href="/contact">
                        Book a Session with Mr. Mukarram
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Teaching Approach Section */}
      <section className="py-16 md:py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.2),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.2),transparent_50%)]"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Teaching Approach</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Our tutors employ a variety of teaching methods tailored to each student's learning style.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {[
              {
                title: "Conceptual Understanding",
                description:
                  "We focus on building a strong foundation by ensuring students truly understand the concepts rather than just memorizing formulas.",
              },
              {
                title: "Problem-Solving Skills",
                description:
                  "Our tutors help students develop critical thinking and problem-solving skills that are applicable beyond the classroom.",
              },
              {
                title: "Exam Preparation",
                description:
                  "We provide targeted preparation for exams, including practice with past papers and exam techniques to maximize performance.",
              },
            ].map((approach, index) => (
              <Card
                key={index}
                className="overflow-hidden transition-all hover:shadow-lg bg-gray-800 border-gray-700 hover:border-primary/50"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white">{approach.title}</h3>
                  <p className="mt-4 text-gray-400">{approach.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Find Your Perfect Tutor Today</h2>
            <p className="mt-4 text-lg text-white/90">
              Contact us to discuss your tutoring needs and we'll match you with the right tutor for your learning style
              and goals.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
                asChild
              >
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


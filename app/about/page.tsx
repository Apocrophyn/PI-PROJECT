"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, CheckCircle, Award, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
              transition={{ duration: 0.6 }}
              className="space-y-6 max-w-3xl mx-auto text-center"
            >
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                About Us
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Our Story and Mission</h1>
              <p className="text-lg text-gray-300">
                PI Tutors was founded with a simple yet powerful mission: to make mathematics and physics accessible,
                engaging, and enjoyable for all students. We believe that with the right guidance, every student can
                excel in these subjects.
              </p>
            </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video w-full max-w-4xl mx-auto mb-12"
            >
              <Image
                src="/images/ABOU.png"
                alt="PI Tutors Educational Journey"
                fill
                className="object-contain rounded-lg transition-all duration-300 ring-[0.5px] ring-primary/20 hover:ring-1 hover:ring-primary/40 p-1"
                priority
              />
            </motion.div>
            <div className="space-y-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                Our Story
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="prose prose-lg dark:prose-invert text-gray-300"
              >
                <p>
                  PI Tutors was established by a group of passionate mathematics and physics educators who recognized a
                  gap in traditional education systems. Many students were struggling with these subjects not because they
                  lacked ability, but because they needed personalized attention and teaching methods tailored to their
                  unique learning styles.
                </p>
                <p>
                  Led by Dr. Muhammad Taimur Khan, our team of expert tutors combines academic excellence with practical
                  teaching experience. Dr. Khan, with his PhD and extensive experience as both a secondary school teacher
                  and university lecturer, brings a unique perspective to mathematics education.
                </p>
                <p>
                  What started as a small tutoring service in Rotherham has grown into a respected institution, helping
                  hundreds of students achieve their academic goals in mathematics and physics. We've expanded our
                  services to include online tutoring, making our expertise accessible to students across the UK and
                  beyond.
                </p>
                <p>
                  Today, PI Tutors stands as a testament to our commitment to educational excellence. We continue to
                  evolve our teaching methodologies while staying true to our core mission: helping students build
                  confidence and achieve success in mathematics and physics.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-gray-950 py-16 md:py-24 relative overflow-hidden">
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
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Values</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do at PI Tutors.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                icon: <BookOpen className="h-8 w-8 text-primary" />,
                title: "Excellence",
                description:
                  "We strive for excellence in everything we do, from our teaching methods to our student support.",
              },
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "Personalization",
                description:
                  "We recognize that each student is unique, with different learning styles, strengths, and areas for improvement.",
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-primary" />,
                title: "Integrity",
                description:
                  "We maintain the highest standards of professional conduct and ethical practice in all our interactions.",
              },
              {
                icon: <Award className="h-8 w-8 text-primary" />,
                title: "Innovation",
                description:
                  "We continuously seek to improve our teaching methods and incorporate the latest educational research.",
              },
              {
                icon: <BookOpen className="h-8 w-8 text-primary" />,
                title: "Accessibility",
                description:
                  "We believe quality education should be accessible to all, regardless of location or background.",
              },
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "Community",
                description: "We foster a supportive learning community where students feel valued and encouraged.",
              },
            ].map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden transition-all hover:shadow-xl bg-gray-800 border-gray-700 hover:border-primary group relative">
                  <CardContent className="p-6 flex flex-col items-center text-center relative z-10">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="mb-4 rounded-full bg-primary/10 p-3 group-hover:bg-primary/20"
                    >
                      {value.icon}
                    </motion.div>
                    <h3 className="text-lg font-medium text-white group-hover:text-primary transition-colors duration-200">{value.title}</h3>
                    <p className="mt-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200">{value.description}</p>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Meet Our Team</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Our team of dedicated tutors is committed to helping students achieve academic excellence.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden transition-all hover:shadow-xl bg-gray-800 border-gray-700 hover:border-primary group relative transform hover:scale-105 duration-300">
                <div className="relative aspect-[3/4] overflow-hidden group-hover:opacity-90 transition-opacity duration-300">
                  <Image src="/images/tutor-taimur.png" alt="Dr. Muhammad Taimur Khan" fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white">Dr. Muhammad Taimur Khan</h3>
                  <p className="mt-1 text-sm text-primary font-medium">Founder & Lead Mathematics Tutor</p>
                  <p className="mt-2 text-sm text-gray-400">
                    PhD, PGCert, MSc in Business and Management, BEng Chemical and Process Engineering
                  </p>
                  <p className="mt-4 text-sm text-gray-400">
                    Taimur is passionate about inspiring students by reminding them about the amazing careers these
                    subjects will lead to and how they develop our problem solving and analytical skills.
                  </p>
                  <Button className="mt-4 w-full" variant="outline" asChild>
                    <Link href="/tutors">
                      View Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden transition-all hover:shadow-xl bg-gray-800 border-gray-700 hover:border-primary group relative transform hover:scale-105 duration-300">
                <div className="relative aspect-[3/4] overflow-hidden group-hover:opacity-90 transition-opacity duration-300">
                  <Image src="/images/tutor-mukarram.png" alt="Mr. Muhammad Mukarram" fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white">Mr. Muhammad Mukarram</h3>
                  <p className="mt-1 text-sm text-primary font-medium">Physics & Mathematics Tutor</p>
                  <p className="mt-2 text-sm text-gray-400">
                    PGDE (Physics with Maths), MSc Nanoscience and Engineering, BSc Materials Engineering
                  </p>
                  <p className="mt-4 text-sm text-gray-400">
                    Muhammad is passionate about inspiring students by boosting their confidence through development of
                    problem solving and analytical skills.
                  </p>
                  <Button className="mt-4 w-full" variant="outline" asChild>
                    <Link href="/tutors">
                      View Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
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
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Join Our Learning Community</h2>
            <p className="mt-4 text-lg text-white/90">
              Experience the PI Tutors difference and unlock your full potential in mathematics and physics.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Contact Us Today</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
                asChild
              >
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


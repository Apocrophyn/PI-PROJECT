"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, BookOpen, Users, Award, ArrowRight, Calculator, Brain, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { LottieAnimation } from '@/components/ui/lottie'

export default function Home() {
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
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.2),transparent_50%)]"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-center md:text-left"
            >
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Expert Math & Sciences Tutoring
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Elevate Your</span>
                <span className="block text-primary">Academic Excellence</span>
              </h1>
              <p className="text-lg text-gray-300">
                Personalized tutoring in mathematics and Sciences from KS3 to A-Levels. Our expert educators empower students to
                master complex concepts and achieve remarkable academic success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" asChild>
                  <Link href="/contact">Book a Session</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800" asChild>
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto md:mx-0 max-w-md"
            >
              <div className="relative h-[400px] w-full flex items-center justify-center">
                <LottieAnimation
                  src="/animations/json/Home Page Animation.json"
                  width={600}
                  height={600}
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Why Choose PI Tutors?</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              We provide personalized tutoring services to help students excel in mathematics and sciences to develop critical
              thinking skills.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                icon: <BookOpen className="h-8 w-8 text-primary" />,
                title: "Expert Tutors",
                description: "Our tutors are highly qualified with advanced degrees and teaching experience.",
              },
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "Personalized Learning",
                description: "Customized learning plans tailored to each student's needs and learning style.",
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-primary" />,
                title: "Proven Results",
                description: "Track record of helping students improve their grades and confidence.",
              },
              {
                icon: <Award className="h-8 w-8 text-primary" />,
                title: "Flexible Options",
                description: "Choose between in-person tutoring in Rotherham, Birmingham or online sessions.",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden transition-all hover:shadow-lg bg-gray-800 border-gray-700 hover:border-primary/50">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 rounded-full bg-primary/10 p-3">{feature.icon}</div>
                    <h3 className="text-lg font-medium text-white">{feature.title}</h3>
                    <p className="mt-2 text-sm text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Tutor Section */}
      <section className="bg-gray-950 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Meet Our Tutors</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Our team of dedicated tutors is committed to helping students achieve academic excellence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 rounded-xl shadow-xl overflow-hidden mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
              <div className="col-span-1">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <Image src="/images/tutor-taimur.png" alt="Dr. Muhammad Taimur Khan" fill className="object-cover" />
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
              <div className="col-span-1">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <Image src="/images/tutor-mukarram.png" alt="Mr. Muhammad Mukarram" fill className="object-cover" />
                </div>
              </div>
              <div className="col-span-1 lg:col-span-2 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white">Mr. Muhammad Mukarram</h3>
                <p className="mt-2 text-primary font-medium">Sciences & Mathematics Specialist</p>
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
                      Physics and Maths teacher at an Engineering College in Birmingham. Member and scholar at Institute
                      of Physics (IOP). IGCSE Physics Examiner.
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

          <div className="mt-8 text-center">
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800" asChild>
              <Link href="/tutors">
                View Tutor Profiles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">What Our Students Say</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Hear from our students about their experience with PI Tutors.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {[
              {
                name: "Sarah Johnson",
                role: "GCSE Student",
                content:
                  "Dr. Khan helped me improve my math grade from a 5 to an 8 in just three months. His teaching style made complex concepts easy to understand.",
              },
              {
                name: "James Wilson",
                role: "A-Level Student",
                content:
                  "The personalized approach at PI Tutors was exactly what I needed. My tutor identified my weak areas and focused on strengthening them. I achieved an A in my A-Level maths.",
              },
              {
                name: "Emma Thompson",
                role: "Parent",
                content:
                  "My daughter struggled with math anxiety before joining PI Tutors. Now she approaches math problems with confidence and even enjoys solving them!",
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden transition-all hover:shadow-lg bg-gray-800 border-gray-700 hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full bg-primary/10">
                        <div className="absolute inset-0 flex items-center justify-center text-primary font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">{testimonial.name}</h3>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-300">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Math Section */}
      <section className="py-16 md:py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.2),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.2),transparent_50%)]"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Interactive Learning
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Making Mathematics Engaging & Fun
              </h2>
              <p className="text-lg text-gray-300">
                Our tutors use interactive methods and real-world examples to make learning mathematics and sciences
                engaging and relevant.
              </p>
              <ul className="space-y-4">
                {[
                  {
                    icon: <Calculator className="h-5 w-5 text-primary" />,
                    title: "Problem-Based Learning",
                    description:
                      "Learn through solving real-world problems that demonstrate the practical applications of mathematical concepts.",
                  },
                  {
                    icon: <Brain className="h-5 w-5 text-primary" />,
                    title: "Visual Learning Tools",
                    description:
                      "Utilize diagrams, graphs, and interactive visualizations to understand complex mathematical relationships.",
                  },
                  {
                    icon: <CheckCircle className="h-5 w-5 text-primary" />,
                    title: "Personalized Approach",
                    description:
                      "Tailored teaching methods that adapt to your learning style and pace for optimal understanding.",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex">
                    <div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div>
                <Button asChild>
                  <Link href="/services">
                    Explore Our Methods
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto md:mx-0"
            >
              <div className="h-[400px] w-full flex items-center justify-center">
                <LottieAnimation
                  src="/animations/json/Home Page Animation.json"
                  width={400}
                  height={400}
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
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
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to Excel in Mathematics and sciences?</h2>
            <p className="mt-4 text-lg text-white/90">
              Book a session with one of our expert tutors today and take the first step towards academic success.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Book a Free Consultation</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
                asChild
              >
                <Link href="/services">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


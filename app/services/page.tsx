"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

export interface Service {
  title: string;
  description: string;
  features: string[];
  image: string;
}

// ServiceCard component for displaying service information
const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <Card className="h-full bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors duration-300">
      <CardHeader>
        <div className="relative w-full h-48 mb-4">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-contain"
          />
        </div>
        <CardTitle className="text-xl font-bold text-white mb-2">
          {service.title}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {service.features.map((feature, featureIndex) => (
            <li
              key={featureIndex}
              className="flex items-start space-x-2 text-gray-300"
            >
              <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link
          href="/contact"
          className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
        >
          <span>Learn more</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default function ServicesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const tutoringFormats = [
    {
      title: "One-on-One Tutoring",
      description: "Personalized attention and customized learning plans.",
      features: [
        "Individual attention",
        "Customized pace",
        "Flexible scheduling",
        "Targeted support",
        "Regular progress updates",
      ],
      image: "/images/one-on-one-tutoring.svg",
    },
    {
      title: "Online Tutoring",
      description: "Convenient and effective remote learning solutions.",
      features: [
        "Interactive sessions",
        "Digital resources",
        "Flexible timing",
        "Screen sharing",
        "Recording options",
      ],
      image: "/images/online-tutoring.svg",
    },
    {
      title: "Small Group Sessions",
      description: "Collaborative learning in small, focused groups.",
      features: [
        "Peer learning",
        "Cost-effective",
        "Group discussions",
        "Shared resources",
        "Social interaction",
      ],
      image: "/images/small-group-tutoring.svg",
    },
  ];

  const allServices: Service[] = [
    {
      title: "KS3 Mathematics",
      description: "Building strong foundations in mathematics for students aged 11-14.",
      features: [
        "Number and algebra fundamentals",
        "Geometry and measures",
        "Statistics and probability",
        "Problem-solving techniques",
        "Preparation for GCSE",
      ],
      image: "/images/ks3-math.svg",
    },
    {
      title: "KS3 Chemistry",
      description: "Introduction to chemistry concepts for Key Stage 3 students.",
      features: [
        "Atomic structure and elements",
        "Chemical reactions",
        "Acids and bases",
        "Practical experiments",
        "Scientific method",
      ],
      image: "/images/ks3-chemistry-animation.svg",
    },
    {
      title: "KS3 Biology",
      description: "Introduction to biology concepts for Key Stage 3 students.",
      features: [
        "Cell structure and function",
        "Human body systems",
        "Plants and photosynthesis",
        "Practical experiments",
        "Scientific method",
      ],
      image: "/images/ks3-biology-animation.svg",
    },
    {
      title: "GCSE Mathematics",
      description: "Comprehensive GCSE mathematics preparation and support.",
      features: [
        "Exam technique and practice",
        "Past paper solutions",
        "Topic-specific revision",
        "Grade improvement strategies",
        "Confidence building",
      ],
      image: "/images/gcse-math.svg",
    },
    {
      title: "GCSE Chemistry",
      description: "Comprehensive chemistry tutoring for GCSE excellence.",
      features: [
        "Atomic structure and bonding",
        "Chemical reactions and equations",
        "Required practicals",
        "Exam technique",
        "Foundation and Higher tier",
      ],
      image: "/images/ks3-chemistry-animation.svg",
    },
    {
      title: "GCSE Biology",
      description: "Comprehensive biology tutoring for GCSE success.",
      features: [
        "Cell biology and organization",
        "Disease and bioenergetics",
        "Required practicals",
        "Exam technique",
        "Foundation and Higher tier",
      ],
      image: "/images/ks3-biology-animation.svg",
    },
    {
      title: "A-Level Mathematics",
      description: "Expert guidance for A-Level mathematics success.",
      features: [
        "Pure mathematics mastery",
        "Applied mathematics support",
        "Exam preparation",
        "Complex problem-solving",
        "University preparation",
      ],
      image: "/images/alevel-math.svg",
    },
    {
      title: "KS3 Physics",
      description: "Introduction to physics concepts for Key Stage 3 students.",
      features: [
        "Forces and motion",
        "Energy and waves",
        "Electricity and magnetism",
        "Practical experiments",
        "Scientific method",
      ],
      image: "/images/ks3-physics-animation.svg",
    },
    {
      title: "GCSE Physics",
      description: "Comprehensive physics tutoring for GCSE excellence.",
      features: [
        "Core physics concepts",
        "Mathematical applications",
        "Required practicals",
        "Exam technique",
        "Foundation and Higher tier",
      ],
      image: "/images/physics-animation.svg",
    },
    {
      title: "A-Level Physics",
      description: "Advanced physics tutoring for A-Level students.",
      features: [
        "Mechanics and materials",
        "Waves and particles",
        "Fields and interactions",
        "Advanced mathematics",
        "University preparation",
      ],
      image: "/images/alevel-physics-animation.svg",
    },
    {
      title: "Academic Assessment",
      description: "Comprehensive evaluation of current knowledge and areas for improvement.",
      features: [
        "Initial assessment",
        "Progress tracking",
        "Personalized feedback",
        "Regular updates",
        "Goal setting",
      ],
      image: "/images/academic-assessment-animation.svg",
    },
    {
      title: "Exam Preparation",
      description: "Targeted preparation for specific exams and test-taking strategies.",
      features: [
        "Exam techniques",
        "Past paper practice",
        "Time management",
        "Stress management",
        "Mock exams",
      ],
      image: "/images/exam-prep-animation.svg",
    },
    {
      title: "Homework Help",
      description: "Support with challenging homework assignments and projects.",
      features: [
        "One-on-one support",
        "Project guidance",
        "Problem-solving",
        "Study skills",
        "Time management",
      ],
      image: "/images/homework-help-animation.svg",
    },
    {
      title: "University Support",
      description: "Guidance for university applications and entrance exams.",
      features: [
        "Application advice",
        "Personal statement",
        "Interview prep",
        "Entrance exams",
        "Course selection",
      ],
      image: "/images/university-support-animation.svg",
    },
  ];

  // Filter services for different sections
  const subjectServices = allServices.filter(service => [
    'KS3 Mathematics',
    'KS3 Chemistry',
    'KS3 Biology',
    'GCSE Mathematics',
    'GCSE Chemistry',
    'GCSE Biology',
    'KS3 Physics',
    'GCSE Physics',
    'A-Level Mathematics',
    'A-Level Physics'
  ].includes(service.title));

  const additionalSupport = allServices.filter(service => [
    'Academic Assessment',
    'Exam Preparation',
    'Homework Help',
    'University Support'
  ].includes(service.title));

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-xl text-gray-400">
              Empowering students through personalized tutoring in Mathematics and Sciences
            </p>
          </div>

          {/* Subject Services Section with Carousel */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Subject Services</h2>
            <Carousel className="w-full max-w-6xl mx-auto">
              <CarouselContent>
                {subjectServices.map((service, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <ServiceCard service={service} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-6">
                <CarouselPrevious className="static translate-x-0" />
                <CarouselNext className="static translate-x-0" />
              </div>
            </Carousel>
          </div>

          {/* Tutoring Formats Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Tutoring Formats</h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {tutoringFormats.map((format, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative group"
                >
                  <ServiceCard service={format} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Additional Support Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Additional Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {additionalSupport.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* A-Level Card */}
              <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white text-center">A-Level</CardTitle>
                  <div className="text-center mt-4">
                    <span className="text-4xl font-bold text-blue-500">£50</span>
                    <span className="text-gray-400 ml-2">/ hour</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>One-on-one tutoring</span>
                    </li>
                    <li className="flex items-start space-x-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>Personalized learning plan</span>
                    </li>
                    <li className="flex items-start space-x-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>University preparation</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button asChild variant="secondary">
                    <Link href="/contact#contact-form">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* GCSE & KS3 One-on-One Card */}
              <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white text-center">GCSE & KS3</CardTitle>
                  <div className="text-center mt-4">
                    <span className="text-4xl font-bold text-blue-500">£35</span>
                    <span className="text-gray-400 ml-2">/ hour</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>One-on-one tutoring</span>
                    </li>
                    <li className="flex items-start space-x-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>Exam preparation</span>
                    </li>
                    <li className="flex items-start space-x-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>Regular progress tracking</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button asChild variant="secondary">
                    <Link href="/contact#contact-form">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Small Groups Card */}
              <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white text-center">Small Groups</CardTitle>
                  <div className="text-center mt-4">
                    <span className="text-4xl font-bold text-blue-500">£25</span>
                    <span className="text-gray-400 ml-2">/ hour</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>Small group sessions</span>
                    </li>
                    <li className="flex items-start space-x-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>Interactive learning</span>
                    </li>
                    <li className="flex items-start space-x-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>Cost-effective option</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button asChild variant="secondary">
                    <Link href="/contact#contact-form">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <section className="bg-primary py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-3xl text-center"
              >
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to Get Started?</h2>
                <p className="mt-4 text-lg text-white/90">
                  Contact us today to discuss your tutoring needs and find the perfect learning solution for you.
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
                    <Link href="/tutors">Meet Our Tutors</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
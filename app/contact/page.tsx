"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { LottieAnimation } from '@/components/ui/lottie'

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    contactPreference: "email",
    service: "",
    submitted: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setFormState({ ...formState, submitted: true })
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormState({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          contactPreference: "email",
          service: "",
          submitted: false,
        })
      }, 5000)
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState({ ...formState, [name]: value })
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
              Get in Touch
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Contact Us</h1>
            <p className="mt-4 text-lg text-gray-300">
              Have questions or ready to start your tutoring journey? We're here to help. Reach out to us using the
              contact information below or fill out the form.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            <Card className="overflow-hidden transition-all hover:shadow-lg bg-gray-800 border-gray-700 hover:border-primary/50">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-white">Phone</h3>
                <p className="mt-2 text-gray-400">722-337-879</p>
                <Button variant="link" className="mt-2 p-0 text-primary" asChild>
                  <a href="tel:722337879">Call Us</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-lg bg-gray-800 border-gray-700 hover:border-primary/50">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-white">Email</h3>
                <p className="mt-2 text-gray-400">info@pitutors.com</p>
                <Button variant="link" className="mt-2 p-0 text-primary" asChild>
                  <a href="mailto:info@pitutors.com">Email Us</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-lg bg-gray-800 border-gray-700 hover:border-primary/50">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-white">Location</h3>
                <p className="mt-2 text-gray-400">Rotherham & Birmingham</p>
                <Button variant="link" className="mt-2 p-0 text-primary" asChild>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                    View on Map
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-lg bg-gray-800 border-gray-700 hover:border-primary/50">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-white">Hours</h3>
                <p className="mt-2 text-gray-400">
                  Monday - Friday: 9am - 8pm
                  <br />
                  Saturday: 10am - 4pm
                  <br />
                  Sunday: Closed
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-950 py-16 md:py-24 relative overflow-hidden">
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
              className="hidden md:block"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-xl">
                <LottieAnimation
                  src="/animations/json/Contact Page Animation.json"
                  width={400}
                  height={400}
                  className="w-full h-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-white">Send Us a Message</h2>
                <p className="mt-4 text-lg text-gray-400">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              {formState.submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  className="rounded-lg bg-green-900/20 p-6 border border-green-700"
                >
                  <div className="flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }}
                    >
                      <CheckCircle className="h-16 w-16 text-green-500" />
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="mt-4 text-2xl font-medium text-green-400 text-center">Message Sent Successfully!</h3>
                    <p className="mt-2 text-green-400 text-center">Thank you for contacting us. We'll get back to you shortly.</p>
                  </motion.div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="123-456-7890"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-white">
                        Service Interested In
                      </Label>
                      <Select
                        value={formState.service}
                        onValueChange={(value) => setFormState({ ...formState, service: value })}
                      >
                        <SelectTrigger id="service" className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="ks3-maths">KS3 Mathematics (£35/hour)</SelectItem>
                          <SelectItem value="ks3-physics">KS3 Physics (£35/hour)</SelectItem>
                          <SelectItem value="ks3-chemistry">KS3 Chemistry (£35/hour)</SelectItem>
                          <SelectItem value="ks3-biology">KS3 Biology (£35/hour)</SelectItem>
                          <SelectItem value="gcse-maths">GCSE Mathematics (£35/hour)</SelectItem>
                          <SelectItem value="gcse-physics">GCSE Physics (£35/hour)</SelectItem>
                          <SelectItem value="gcse-chemistry">GCSE Chemistry (£35/hour)</SelectItem>
                          <SelectItem value="gcse-biology">GCSE Biology (£35/hour)</SelectItem>
                          <SelectItem value="alevel-maths">A-Level Mathematics (£50/hour)</SelectItem>
                          <SelectItem value="alevel-physics">A-Level Physics (£50/hour)</SelectItem>
                          <SelectItem value="small-group">Small Group Sessions (£25/hour)</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Please provide details about your tutoring needs..."
                      className="min-h-[120px] bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Preferred Contact Method</Label>
                    <RadioGroup
                      value={formState.contactPreference}
                      onValueChange={(value) => setFormState({ ...formState, contactPreference: value })}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="email-preference" />
                        <Label htmlFor="email-preference" className="text-white">
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="phone-preference" />
                        <Label htmlFor="phone-preference" className="text-white">
                          Phone
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center space-x-2"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Sending...</span>
                      </motion.div>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our tutoring services.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                question: "How do I schedule a tutoring session?",
                answer:
                  "You can schedule a tutoring session by filling out the contact form above, calling us directly, or sending an email. We'll get back to you promptly to arrange a suitable time.",
              },
              {
                question: "What are your tutoring rates?",
                answer:
                  "Our rates are structured as follows: A-Level one-on-one tutoring is £50 per hour, GCSE and KS3 one-on-one tutoring is £35 per hour, and small group sessions (up to 4 students) are £25 per hour per student. Contact us to learn more about our pricing and available slots.",
              },
              {
                question: "Do you offer online tutoring?",
                answer:
                  "Yes, we offer both in-person tutoring in Rotherham and Birmingham as well as online tutoring via video conferencing platforms. Our online sessions are interactive and include digital whiteboards for effective learning.",
              },
              {
                question: "How long are the tutoring sessions?",
                answer:
                  "Standard tutoring sessions are 60 minutes long, but we can arrange 90-minute or 2-hour sessions for more intensive study, particularly for A-Level students or exam preparation.",
              },
              {
                question: "Can I cancel or reschedule a session?",
                answer:
                  "Yes, you can cancel or reschedule a session with at least 24 hours' notice without any charge. Cancellations with less notice may incur a fee.",
              },
              {
                question: "Do you provide learning materials?",
                answer:
                  "Yes, our tutors provide all necessary learning materials, including worksheets, practice problems, and study guides. These are tailored to each student's specific needs and curriculum requirements.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-700 p-6 shadow-sm bg-gray-800 hover:border-primary/50 transition-all"
              >
                <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                <p className="mt-2 text-gray-400">{faq.answer}</p>
              </div>
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
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Contact us today to schedule a free consultation and discover how our tutoring services can help you
              achieve academic excellence.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Book Free Consultation</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
                asChild
              >
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


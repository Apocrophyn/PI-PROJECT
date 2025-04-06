'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, CheckCircle } from 'lucide-react';
import { LottieAnimation } from '@/components/ui/lottie';

export function BlogCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show CTA after scrolling down a bit
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.5 }}
      className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-gradient-to-r from-primary/90 to-primary p-4 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="hidden md:block w-16 h-16">
                <LottieAnimation
                  src="/animations/json/Contact Page Animation.json"
                  width={64}
                  height={64}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Ready to excel in your studies?</h3>
                <p className="text-white/80">Book a session with our expert tutors today!</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/contact">
                  Book a Session
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/services">
                  Explore Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 
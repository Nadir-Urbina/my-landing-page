"use client"

import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useState } from 'react'
import Link from 'next/link'
import { getHealingStreamsContent } from '@/lib/sanity.client'
import type { Testimonial, Event } from '@/types/sanity'

const montserrat = Montserrat({ subsets: ['latin'] })

interface HealingStreamsContent {
  _id: string;
  title: string;
  description: string;
  image: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  galleryImages: Array<{
    asset: {
      _ref: string;
      _type: "reference";
    };
  }>;
  testimonials: Testimonial[];
  upcomingEvents: Event[];
}

export default async function HealingStreamsPage() {
  const content = await getHealingStreamsContent()

  // Add fallback/loading state
  if (!content) {
    return (
      <div className="container mx-auto p-4">
        <h1>Healing Streams</h1>
        <p>Loading content...</p>
      </div>
    )
  }

  return (
    <main className="flex-1">
      {/* Back Button */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-white bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/40 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          Back
        </Link>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={content.image.asset._ref}
            alt="Healing Streams Ministry"
            fill
            className="absolute inset-0 object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </motion.div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8"
        >
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold ${montserrat.className}`}>
            {content.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto">
            {content.description}
          </p>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container">
          <h2 className={`text-3xl font-bold mb-8 ${montserrat.className}`}>Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.galleryImages?.map((image: { asset: { _ref: string } }, index: number) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={image.asset._ref}
                  alt={`Healing Streams Gallery ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className={`text-3xl font-bold mb-8 text-center ${montserrat.className}`}>
            Testimonials
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.testimonials.map((testimonial: Testimonial) => (
              <Card key={testimonial._id}>
                {/* ... Testimonial card content ... */}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16">
        <div className="container">
          <h2 className={`text-3xl font-bold mb-8 ${montserrat.className}`}>
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.upcomingEvents.map((event: Event) => (
              <Card key={event._id}>
                {/* ... Event card content ... */}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact</h3>
              <div className="space-y-2 text-gray-600">
                <p>East Gate Kingdom Fellowship</p>
                <p>Jacksonville, Florida</p>
                <p>United States</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
                <Link href="/east-gate" className="text-gray-600 hover:text-gray-900 transition-colors">East Gate</Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Connect</h3>
              <div className="flex flex-col space-y-2">
                <Link 
                  href="https://www.facebook.com" 
                  target="_blank" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Facebook
                </Link>
                <Link 
                  href="https://www.instagram.com" 
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Instagram
                </Link>
                <Link 
                  href="https://www.youtube.com" 
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  YouTube
                </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Newsletter</h3>
              <p className="text-gray-600">Stay updated with our latest news and events.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} Healing Streams International. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
"use client"

import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useState } from 'react'
import Link from 'next/link'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function HealingStreamsPage() {
  const [activeImage, setActiveImage] = useState(0)
  const images = [
    "/healingStreams/ausHealingStreams.JPG",
    "/healingStreams/ausHealingStreams2.JPG",
    "/healingStreams/drJoshPrayingforEmma.JPG"
  ]

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

      {/* Hero Section with Image Carousel */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={images[activeImage]}
            alt="Healing Streams Ministry"
            fill
            className="absolute inset-0 object-cover transition-opacity duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </motion.div>

        {/* Image Navigation Dots */}
        <div className="absolute bottom-8 flex gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeImage === index ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8"
        >
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold ${montserrat.className}`}>
            Healing Streams International
          </h1>
          <p className="mt-4 text-xl sm:text-2xl max-w-3xl mx-auto">
            Training and equipping believers in Kingdom principles for spiritual wholeness
          </p>
        </motion.div>
      </section>

      {/* Main Content with Grid Layout */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center mb-16"
          >
            <div className="prose prose-lg">
              <h2 className={`text-3xl font-bold mb-6 ${montserrat.className}`}>Our Vision</h2>
              <p className="text-lg">
                Healing Streams International is a powerful ministry expression that supports believers 
                through the training and equipping of Kingdom principles and the removal of spiritual 
                root systems that are impeding forward momentum in an individual's journey towards 
                who they truly are.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/healingStreams/ausHealingStreams.JPG"
                alt="Healing Streams Ministry"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg mx-auto mb-16"
          >
            <p className="text-lg mb-6">
              With a unique lens, the goal is to see manifested what believer looks 
              like had the impacts of wounds, trauma, demonization, had those things never occurred. 
              Appropriating the finished work of the Cross of Jesus Christ, authority of scripture, the 
              power of intimacy with the person of Holy Spirit, and reality of several hearted 
              leadership, individuals are set free at new levels.
            </p>
            <p className="text-lg">
              The rich history of healing streams is worthy of note. Beginning in revelation part of the 
              well-known "Cleansing Streams" and then further developed under the ministry known 
              as "Freedom Ministry International", by Dr Don Lynch, and then finally "Bloodline 
              deliverance" with Mike Brewer, this seminar format allows Holy Spirit to work to bring 
              wholeness into the entire man.
            </p>
          </motion.div>

          {/* FAQ Section with Interactive Cards */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <h2 className={`text-3xl font-bold mb-8 text-center ${montserrat.className}`}>
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "What are the formats of Healing Streams?",
                  content: "Healing Streams follows several formats that range from individual ministry sessions, to 3 day concentrations, 5 day intensive and 13 week seminars. These are done upon the basis of need and capacity for ministry."
                },
                {
                  title: "Where is the base of Healing Streams located?",
                  content: "Healing Streams International is headquartered in Jacksonville Florida, among the team of East Gate Kingdom Fellowship. This base reaches out to nations regularly."
                },
                {
                  title: "What are the 3 levels of Healing Streams?",
                  content: "The first level is called Encounter Christ, is about a fresh encounter of Jesus as described in John 8. This is not about knowledge in the head, but experiencing authentic encounter. The Second level is 'Encounter Holy Spirit,' and is about encountering the person of Holy Spirit intimately. This level deals with substances for deliverance and healing."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3">{faq.title}</h3>
                      <p className="text-gray-600">{faq.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
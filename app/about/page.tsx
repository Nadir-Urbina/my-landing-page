"use client"

import Link from 'next/link'
import { motion } from "framer-motion"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function AboutPage() {
  return (
    <main className="flex-1">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-white bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/40 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </motion.div>

      <section className="relative min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src="/drJosh/DrJoshSmiling.jpg"
            alt="Dr. Joshua Todd speaking"
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
            About Dr. Joshua Todd
          </h1>
        </motion.div>
      </section>

      <main className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/drJosh/drJoshSmilingMic.jpg"
              alt="Dr. Joshua Todd"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="space-y-6">
            <h2 className={`text-2xl font-semibold ${montserrat.className}`}>Early Life & Calling</h2>
            <p className="text-lg">
              Joshua Todd was born again in 1994 after a profound encounter with Jesus, accepting his call to ministry that same year. In his late teens, regular encounters with the Lord through His Word ignited a deep desire for a more meaningful relationship with God.
            </p>
            <p className="text-lg">
              A pivotal moment came in 1999 during a visit to Ireland, where he was baptized in the Holy Spirit. This life-changing experience set him on a global missionary journey and led him to pursue theological education.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-muted p-8 rounded-xl shadow-md">
            <h2 className={`text-2xl font-semibold mb-4 ${montserrat.className}`}>Education & Training</h2>
            <p className="text-lg">
              Joshua studied at the Southern Baptist Theological Seminary, where he was unexpectedly introduced to deliverance through another studenta, a key element that has since shaped his life and leadership. He went on to earn a master's degree from Wagner Leadership Institute and a doctorate from Kingdom Leadership Institute.
            </p>
          </div>

          <div className="bg-muted p-8 rounded-xl shadow-md">
            <h2 className={`text-2xl font-semibold mb-4 ${montserrat.className}`}>Ministry Focus</h2>
            <p className="text-lg mb-4">Dr. Todd's ministry focuses on several key areas:</p>
            <ul className="list-disc list-inside space-y-2 text-lg ml-4">
              <li>Kingdom Culture Development</li>
              <li>Spiritual Fathering and Sonship</li>
              <li>Healing and Deliverance Ministry</li>
              <li>Leadership Development</li>
              <li>Global Missions and Church Planting</li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6 md:order-2">
            <h2 className={`text-2xl font-semibold ${montserrat.className}`}>Family Life</h2>
            <p className="text-lg">
              Joshua has been happily married to Coral for 18 years, and they are blessed with two wonderful children, Mia and Joshua. Their family stands as a testament to the principles of Kingdom culture and family values that Dr. Todd teaches.
            </p>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl md:order-1">
            <Image
              src="/drJosh/drJoshAndCoral.jpg"
              alt="Dr. Joshua Todd with family"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="text-center">
          <h2 className={`text-2xl font-semibold mb-6 ${montserrat.className}`}>Connect with Dr. Todd</h2>
          <div className="flex gap-4 justify-center">
            <Button asChild className="bg-[#14181F] text-white hover:bg-[#14181F]/90">
              <Link href="/#events">
                Upcoming Events
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/#books">
                View Books
              </Link>
            </Button>
          </div>
        </div>
      </main>

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
                <Link 
                  href="https://www.eastgatejax.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  East Gate
                </Link>
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
                © {new Date().getFullYear()} Dr. Joshua Todd. All rights reserved.
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
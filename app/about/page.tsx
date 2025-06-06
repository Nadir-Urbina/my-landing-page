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
          <div className="flex flex-col justify-center">
            <h2 className={`text-3xl font-bold mb-6 ${montserrat.className}`}>The Journey</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              From a powerful encounter with the Holy Spirit in Northern Ireland to becoming a global leader in Kingdom culture, Dr. Joshua&apos;s story is one of divine calling, faithful preparation, and unwavering commitment to raising up the next generation of leaders.
            </p>
          </div>
        </div>

        {/* Card-based timeline */}
        <div className="space-y-8 mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${montserrat.className}`}>His Story</h2>
          
          {/* Card 1: The Holy Spirit Encounter */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">The Holy Spirit Encounter</h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Dr. Joshua&apos;s journey into the nations began with a powerful baptism in the Holy Spirit while ministering in Northern Ireland. That encounter lit a fire in him, sending him to the Northeastern United States after high school to mentor with Victory Center Church, where he began moving in signs and wonders.
              </p>
            </div>
          </div>

          {/* Card 2: Educational Foundation */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Educational Foundation</h3>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-gray-700">
                  After that season, Joshua returned home, feeling the need for deeper grounding in the Word but unsure where to begin. He enrolled at Boyce College, the undergraduate school of The Southern Baptist Theological Seminary in Louisville, Kentucky. There, he quickly became known among the students and even traveled across the country representing the college.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  During his time at Boyce, Joshua experienced a life-changing moment of deliverance through another student in his dorm. The same fire fell on both of them, and together they began ministering to the homeless at the Salvation Army.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Meeting Coral & Ministry Formation */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Meeting Coral & Ministry Formation</h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Two years into the program, Joshua felt his time there was complete. He returned to Jacksonville, Florida, where he met his wife, Coral. Together, they entered a school of ministry and spent two years immersed in the Word of Faith movement, growing in faith and preparing for a season of intense ministry.
              </p>
            </div>
          </div>

          {/* Card 4: Spiritual Fathering & Advanced Education */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Spiritual Fathering & Advanced Education</h3>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-gray-700">
                  After four years, Joshua connected with Dr. Don Lynch, who became his spiritual father for nearly 14 years. Under Dr. Don&apos;s guidance, Joshua enrolled in Wagner Leadership Institute, where he earned his Bachelor&apos;s and Master&apos;s degrees in Practical Ministry. Still, they both knew there was more.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  Together, they helped establish the Kingdom Leadership Institute. Three years later, under rigorous conditions, Joshua earned the first-ever Doctorate of Kingdom Leadership from the school—awarded based on years of leading successful international ministry and building a strong, mission-focused local church.
                </p>
              </div>
            </div>
          </div>

          {/* Card 5: Transition & New Beginnings */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Transition & New Beginnings</h3>
              <p className="text-lg leading-relaxed text-gray-700">
                In 2021, Joshua and Dr. Don began developing the next phase of the school. Sadly, Dr. Don transitioned to glory in February 2022. Later that year, the board chose a different direction, and Joshua was honorably released by Ruthanne Lynch in October 2022 to continue walking in his God-given inheritance.
              </p>
            </div>
          </div>

          {/* Card 6: Today's Mission */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border-2 border-purple-200">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Today&apos;s Mission</h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Today, Dr. Joshua is the founder of Kingdom Champions College, dedicated to raising up leaders for the nations. He also serves as the Senior Leader of East Gate Jacksonville—a Kingdom center positioned at the East Gate of the United States, where the gospel first arrived on American shores.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6 md:order-2">
            <h2 className={`text-2xl font-semibold ${montserrat.className}`}>Family Life</h2>
            <p className="text-lg">
              Joshua has been happily married to Coral for 18 years, and they are blessed with two wonderful children, Mia and Joshua. Their family stands as a testament to the principles of Kingdom culture and family values that Dr. Todd teaches.
            </p>
            <p className="text-lg">
            In 2022, The Lord spoke to the Todd family and encouraged them to embrace this reality, that if they would answer to the call to establish a place of Kingdom family, He would restore natural families.    Since this time, supernatural kingdom family has impacted natural families around the world.   Learn more about this vision by visiting www.eastgatejax.com (http://www.eastgatejax.com) which acts as the International Hub expanding Kingdom family so that the gates of Hell cannot prevail against it. 
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
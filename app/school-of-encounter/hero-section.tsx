'use client'

import Image from 'next/image'
import { motion } from "framer-motion"
import { Montserrat } from 'next/font/google'
import { ScrollButton } from '@/components/scroll-button'
import { useState } from 'react'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-800 to-purple-900" />
      
      {/* Content over background */}
      <div className="container relative z-10 px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`${montserrat.className} text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8`}>
            The School of <span className="text-indigo-400">Encounter</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12">
            Welcome to the School of Encounter, where we gather around the table of the Father to learn from Spirit-Filled Instructors and grow as a community of disciples.
          </p>
          
          <div className="flex flex-col items-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.8, 
                duration: 0.5 
              }}
              className="relative inline-block"
            >
              <motion.span
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(129, 140, 248, 0)", 
                    "0 0 0 10px rgba(129, 140, 248, 0.3)", 
                    "0 0 0 0 rgba(129, 140, 248, 0)"
                  ] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3 
                }}
                className="inline-block rounded-full px-8 py-3 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm"
              >
                <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
                  Launching March 23rd, 2025
                </span>
              </motion.span>
            </motion.div>
            
            <ScrollButton targetId="interest-form" />
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
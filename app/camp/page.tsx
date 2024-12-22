'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Montserrat } from 'next/font/google'
import { Input } from '@/components/ui/input'
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

const montserrat = Montserrat({ subsets: ['latin'] })

export default function CampPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/camp-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          fullName: name,
          source: 'CAMP Info Request'
        }),
      })

      if (!res.ok) throw new Error('Failed to submit')

      toast({
        title: "Success!",
        description: "We'll be in touch soon with more information about CAMP.",
        className: "bg-white text-gray-900 border-green-500",
      })

      setEmail('')
      setName('')
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
        className: "bg-white text-red-600 border-red-500",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex-1">
      {/* Back Button */}
      <motion.div 
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-white bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/40 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back Home
        </Link>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src="/ministry/camp-heroImg.webp"
              alt="CAMP Hero"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <motion.div 
            className="absolute inset-0 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
        </div>
        <div className="container relative z-10 text-white">
          <motion.h1 
            className={`text-5xl md:text-6xl font-bold mb-6 ${montserrat.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            CAMP
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            A sacred gathering space where prayer warriors are equipped and empowered
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container">
          {/* About Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="prose prose-lg">
              <h2 className={`text-3xl font-bold ${montserrat.className}`}>About CAMP</h2>
              <p>
                CAMP is a sacred gathering space where prayer warriors are equipped and empowered 
                to fulfill their divine roles through strategic intercession, prophetic mentoring, 
                and by mastering prevailing prayer.
              </p>
              <p>
                Rooted in covenant alignment, CAMP fosters deep relational bonds, spiritual growth, 
                and the development of Christ-centered leadership.
              </p>
              <p>
                Through a focus on intimacy with God and standing with each other, CAMP exists to 
                see individuals and families transformed into vessels of God's glory, advancing His 
                Kingdom with unity, purpose, and unwavering faith.
              </p>
              <blockquote className="text-xl italic border-l-4 pl-4 my-8">
                "I will heal natural families in kingdom family" - God
              </blockquote>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Core Features */}
            <Card className="h-full rounded-xl overflow-hidden">
              <CardContent className="p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Strategic Intercession</h3>
                <p className="text-muted-foreground">Equipping prayer warriors with powerful intercession strategies</p>
              </CardContent>
            </Card>

            <Card className="h-full rounded-xl overflow-hidden">
              <CardContent className="p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Prophetic Mentoring</h3>
                <p className="text-muted-foreground">Developing Christ-centered leadership through prophetic guidance</p>
              </CardContent>
            </Card>

            <Card className="h-full rounded-xl overflow-hidden">
              <CardContent className="p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Covenant Alignment</h3>
                <p className="text-muted-foreground">Building deep relational bonds in kingdom family</p>
              </CardContent>
            </Card>

            {/* Additional Features */}
            <Card className="h-full rounded-xl overflow-hidden">
              <CardContent className="p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Prevailing Prayer</h3>
                <p className="text-muted-foreground">
                  Mastering the art of effective and persistent prayer, learning to stand in faith until breakthrough manifests.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full rounded-xl overflow-hidden">
              <CardContent className="p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">High Courts of the Lord</h3>
                <p className="text-muted-foreground">
                  Understanding and operating in heavenly judicial systems, learning to present cases before the throne.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full rounded-xl overflow-hidden">
              <CardContent className="p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Prophetic Development</h3>
                <p className="text-muted-foreground">
                  Growing in prophetic gifting through community, company, and corporate prophetic expression, fostering mature prophetic ministry.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-purple-50 to-white">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <h3 className={`text-2xl font-bold mb-4 ${montserrat.className}`}>
              Want to Know More?
            </h3>
            <p className="text-muted-foreground mb-6">
              Leave your email and we'll send you more information about CAMP.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="rounded-xl"
                />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 rounded-xl"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Sending...
                  </>
                ) : (
                  "Send Me Info"
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
} 
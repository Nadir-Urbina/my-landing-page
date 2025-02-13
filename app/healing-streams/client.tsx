'use client'

import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { HealingStreamsTestimonial, HealingStreamsEvent } from '@/types/sanity'
import { urlFor } from '@/lib/sanity.client'
import { FallbackImage } from '@/components/ui/fallback-image'
import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from 'lucide-react'

const montserrat = Montserrat({ subsets: ['latin'] })

interface Props {
  testimonials: HealingStreamsTestimonial[]
  events: HealingStreamsEvent[]
}

export default function HealingStreamsClient({ testimonials, events }: Props) {
  return (
    <main className="flex-1">
      {/* Back Button */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link href="/" className="flex items-center gap-2 px-4 py-2 text-white bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/40 transition-all duration-300">
          <ArrowLeft className="w-4 h-4" />
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
            src="/healingStreams/ausHealingStreams.JPG"
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
            Healing Streams
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto">
            Bringing healing and restoration through the power of God's love
          </p>
        </motion.div>
      </section>

      {/* About Section - using cards but preserving original content */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className={`text-xl font-bold mb-4 ${montserrat.className}`}>
                Our Purpose
              </h3>
              <p className="text-gray-600">
                Healing Streams International is a powerful ministry expression that supports believers 
                through the training and equipping of Kingdom principles and the removal of spiritual 
                root systems that are impeding forward momentum in an individual's journey towards 
                who they truly are. With a unique lens, the goal is to see manifested what believer looks 
                like had the impacts of wounds, trauma, demonization, had those things never occurred.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className={`text-xl font-bold mb-4 ${montserrat.className}`}>
                The Streams
              </h3>
              <p className="text-gray-600">
                Healing Streams is a play on words, not only are the streams that are flowing from the 
                throne of God refreshing and restoring individuals and families, but also releasing 
                judgment upon any entity that is present and can no longer stay hidden. At the same 
                time, the ministry is being used to bring healing to several streams that have been 
                exaggerated, abused, or misunderstood to bring balance to walking the narrow way.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className={`text-xl font-bold mb-4 ${montserrat.className}`}>
                Our Heritage
              </h3>
              <p className="text-gray-600">
                The rich history of healing streams is worthy of note: beginning in revelation part of the 
                well-known "Cleansing Streams" and then further developed under the ministry known 
                as "Freedom Ministry International", by Dr Don Lynch, and then finally "Bloodline 
                deliverance" with Mike Brewer, this seminar format allows Holy Spirit to work to bring 
                wholeness into the entire man. Married with international authority, this ministry 
                expression is traveling all over the world, setting people free.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className={`text-3xl font-bold mb-8 ${montserrat.className}`}>Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              '/healingStreams/ausHealingStreams.JPG',
              '/healingStreams/ausHealingStreams2.JPG',
              '/healingStreams/drJoshPrayingforEmma.JPG',
              '/healingStreams/IMG_0062.JPG',
            ].map((src, index) => (
              <div key={index} className="relative aspect-video rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <Image
                  src={src}
                  alt={`Healing Streams Gallery ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - moved after gallery, preserving original content */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className={`text-3xl font-bold mb-8 ${montserrat.className}`}>
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h4 className="text-xl font-semibold mb-4">What are the formats of Healing Streams?</h4>
              <p className="text-gray-600">
                Healing Streams follows several formats that range from individual ministry sessions, to 
                3 day concentrations, 5 day intensive and 13 week seminars. These are done upon the 
                basis of need and capacity for ministry.
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="text-xl font-semibold mb-4">Where is the base of Healing Streams located?</h4>
              <p className="text-gray-600">
                Healing Streams International is headquartered in Jacksonville Florida, among the team 
                of East Gate Kingdom Fellowship. This base reaches out to nations regularly.
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="text-xl font-semibold mb-4">What are the 3 levels of Healing Streams?</h4>
              <p className="text-gray-600">
                The first level is called Encounter Christ, is about a fresh encounter of Jesus as 
                described in John 8. This is not about knowledge in the head, but experiencing 
                authentic encounter. The Second level is "Encounter Holy Spirit," and is about 
                encountering the person of Holy Spirit intimately. The third level deals with authorities for 
                deliverance.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#F1F5F9]">
        <div className="container">
          <h2 className={`text-3xl font-bold mb-8 ${montserrat.className}`}>
            Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial._id} 
                className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100/80 h-full"
              >
                <div className="p-6">
                  <div className="flex flex-col items-center">
                    {testimonial.imageUrl && (
                      <FallbackImage
                        src={urlFor(testimonial.imageUrl)}
                        alt={`Testimonial from ${testimonial.name}`}
                        fallbackSrc="/placeholder-image.jpg"
                        width={150}
                        height={150}
                        className="rounded-full mb-4 transform group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <h3 className="text-xl font-semibold mb-1">{testimonial.name}</h3>
                    {testimonial.location && (
                      <p className="text-muted-foreground text-sm mb-4">{testimonial.location}</p>
                    )}
                    <p className="text-muted-foreground italic text-center mb-4">{testimonial.text}</p>
                    {testimonial.healingType && (
                      <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 mt-2">
                        {testimonial.healingType.charAt(0).toUpperCase() + testimonial.healingType.slice(1)} Healing
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {testimonials.length === 0 && (
              <p className="text-center text-muted-foreground col-span-full">
                No testimonials available at this time.
              </p>
            )}
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
            {events.map((event) => (
              <Card key={event._id} className="overflow-hidden">
                {event.imageUrl && (
                  <div className="relative h-48">
                    <FallbackImage
                      src={urlFor(event.imageUrl)}
                      alt={event.title}
                      fallbackSrc="/placeholder-image.jpg"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <div className="space-y-2 mb-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                  </div>
                  {event.description && (
                    <p className="text-gray-600 mb-4">{event.description}</p>
                  )}
                  {event.registrationLink && (
                    <Button className="w-full" asChild>
                      <Link href={event.registrationLink}>Register Now</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
            {events.length === 0 && (
              <p className="text-center text-gray-500 col-span-full">
                No upcoming events at this time. Check back soon!
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
} 
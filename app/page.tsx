import type { Testimonial, Event, Book, Mission, Post } from '@/types/sanity'
import { MainNav } from '@/components/MainNav'
import { CarouselWrapper } from '@/components/CarouselWrapper'
import { getTestimonials, getUpcomingEvents, getFeaturedBooks, getMissions, getPosts, urlFor } from '@/lib/sanity.client'
import Link from 'next/link'
import { motion } from "framer-motion"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu, Calendar, Globe, BookOpen, ChevronRight, CircleUserRound, Heart, Crown, Tent, Clock, ArrowRight } from 'lucide-react'
import localFont from 'next/font/local'
import { Montserrat, Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { FallbackImage } from '@/components/ui/fallback-image'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'] })

export default async function LandingPage() {
  // Fetch data
  const testimonials = await getTestimonials()
  console.log('Testimonials:', JSON.stringify(testimonials, null, 2))
  const upcomingEvents = await getUpcomingEvents()
  const featuredBooks = await getFeaturedBooks()
  console.log('Books:', JSON.stringify(featuredBooks, null, 2))
  const missions = await getMissions()
  console.log('Missions:', JSON.stringify(missions, null, 2))
  const blogPosts = await getPosts()
  console.log('Blog Posts:', JSON.stringify(blogPosts, null, 2))

  return (
    <div className={`flex flex-col min-h-screen ${inter.className}`}>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/600">
        <MainNav />
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center py-24">
          <Image
            src="/drJosh/heroImage.png"
            alt="Dr. Joshua Todd speaking on stage with artistic backdrop"
            fill
            className="absolute inset-0 object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center text-white pt-20 px-4 sm:px-0">
            <h1 className={`text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-b from-gray-600 via-gray-400 to-gray-200 text-transparent bg-clip-text ${montserrat.className}`}>
              Dr. Joshua Todd
            </h1>
            <p className="mt-4 text-xl sm:text-2xl md:text-3xl">
              Fathering, Sonship, Kingdom Culture and more
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 mx-4 sm:mx-0">
              <div className="flex flex-row gap-4 w-full sm:w-auto">
                {/* Commented out email subscription section for future use */}
                {/* <form className="flex items-center flex-1 sm:flex-initial">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/10 text-white placeholder-white/50 border-white/20 hover:bg-white/20 transition-colors duration-200 w-full sm:w-[300px] h-[42px] px-4 rounded-2xl"
                    required
                    aria-label="Email for newsletter"
                  />
                </form>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white border-0 whitespace-nowrap h-[42px] px-6 rounded-2xl"
                >
                  Subscribe
                </Button> */}
              </div>
              <Button 
                className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white border-0 w-full sm:w-auto h-[42px] px-6 rounded-2xl"
                asChild
              >
                <Link href="https://give.tithe.ly/?formId=42e3f1ba-6865-11ee-90fc-1260ab546d11">
                  Partner with Me
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-[#F1F5F9]">
          <div className="container">
            <h2 className={`text-3xl font-bold mb-12 ${montserrat.className}`}>Get to Know me</h2>
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-sm">
                <Image
                  src="/drJosh/drJoshSmilingMic.jpg"
                  alt="Dr. Joshua Todd speaking"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="space-y-4 text-lg">
                  <p>
                    Joshua Todd was born again in 1994 after a profound encounter with Jesus, accepting his call to ministry that same year. In his late teens, regular encounters with the Lord through His Word ignited a deep desire for a more meaningful relationship with God. A pivotal moment came in 1999 during a visit to Ireland, where he was baptized in the Holy Spirit. This life-changing experience set him on a global missionary journey and led him to pursue theological education.
                  </p>
                  <p>
                    Joshua studied at the Southern Baptist Theological Seminary, where he was introduced to deliverance ministry—a key element that has since shaped his life and leadership. He went on to earn a master's degree from Wagner Leadership Institute and a doctorate from Kingdom Leadership Institute. Joshua has been happily married to Coral for 18 years, and they are blessed with two wonderful children, Mia and Joshua.
                  </p>
                </div>
                <div className="mt-8">
                  <Button variant="outline" asChild>
                    <Link href="/about">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ministry Life Section */}
        <section id="ministry" className="py-16 bg-white">
          <div className="container">
            <h2 className={`text-3xl font-bold mb-12 ${montserrat.className}`}>Ministry Life</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* East Gate Card */}
              <div className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100/80">
                <div className="relative h-[300px] transform group-hover:scale-105 transition-transform duration-300 ease-in-out">
                  <Image
                    src="/ministry/egkfDarkBg.png"
                    alt="East Gate Logo"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" size="sm" asChild className="bg-white/90 hover:bg-white rounded-full">
                      <Link href="https://www.eastgatejax.com">Learn More</Link>
                    </Button>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold flex items-center gap-2 group-hover:text-blue-600 transition-colors duration-300">
                    <CircleUserRound className="h-5 w-5" />
                    Senior Leader at East Gate
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    As the Senior Leader at East Gate, Dr. Todd guides the spiritual growth and development of the community, fostering an environment of faith, love, and discipleship.
                  </p>
                </div>
              </div>
              {/* CAMP Card */}
              <div className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100/80">
                {/* Registration Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-r from-green-500/90 to-blue-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium animate-pulse">
                    2025 Registration Open
                  </div>
                </div>

                <div className="relative h-[300px] transform group-hover:scale-105 transition-transform duration-300 ease-in-out">
                  <Image
                    src="/ministry/camp.webp"
                    alt="CAMP Logo"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" size="sm" asChild className="bg-white/90 hover:bg-white rounded-full">
                      <Link href="/camp">Learn More</Link>
                    </Button>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold flex items-center gap-2 group-hover:text-blue-600 transition-colors duration-300">
                    <Tent className="h-5 w-5" />  {/* You'll need to import Tent from lucide-react */}
                    CAMP
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A sacred gathering space where prayer warriors are equipped and empowered through strategic intercession, prophetic mentoring, and covenant alignment.
                  </p>
                </div>
              </div>

              {/* Healing Streams Card */}
              <div className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100/80">
                <div className="relative h-[300px] transform group-hover:scale-105 transition-transform duration-300 ease-in-out">
                  <Image
                    src="/ministry/healingStreamsHorizontal.png"
                    alt="Healing Streams Logo"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" size="sm" asChild className="bg-white/90 hover:bg-white rounded-full">
                      <Link href="/healing-streams">Learn More</Link>
                    </Button>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold flex items-center gap-2 group-hover:text-blue-600 transition-colors duration-300">
                    <Heart className="h-5 w-5" />
                    Healing Streams
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Through Healing Streams, Dr. Todd ministers to those in need of physical, emotional, and spiritual healing, bringing hope and restoration to many lives.
                  </p>
                </div>
              </div>

              {/* School of Encounter Card */}
              <div className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100/80">
                <div className="relative h-[300px] transform group-hover:scale-105 transition-transform duration-300 ease-in-out">
                  <Image
                    src="/ministry/tsoeHorizontal2.png"
                    alt="School of Encounter Logo"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" size="sm" asChild className="bg-white/90 hover:bg-white rounded-full">
                      <Link href="/school-of-encounter">Learn More</Link>
                    </Button>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold flex items-center gap-2 group-hover:text-blue-600 transition-colors duration-300">
                    <BookOpen className="h-5 w-5" />
                    The School of Encounter
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Crest of The Wave is Dr. Todd's initiative to equip and empower the next generation of leaders, riding the forefront of spiritual awakening and cultural transformation.
                  </p>
                </div>
              </div>

              {/* TWGA Card */}
              <div className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100/80">
                <div className="relative h-[300px] transform group-hover:scale-105 transition-transform duration-300 ease-in-out">
                  <Image
                    src="/ministry/twgaElder.png"
                    alt="The Well Global Alliance Logo"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" size="sm" asChild className="bg-white/90 hover:bg-white rounded-full">
                      <Link href="https://www.thewellglobal.life/alliance">Learn More</Link>
                    </Button>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold flex items-center gap-2 group-hover:text-blue-600 transition-colors duration-300">
                    <Crown className="h-5 w-5" />
                    Elder at TWGA
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Developing and implementing training programs that establish Kingdom principles and values in individuals, families, and organizations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-[#F1F5F9]">
          <div className="container px-0">
            <h2 className={`text-3xl font-bold mb-8 ${montserrat.className}`}>Testimonials</h2>
            <CarouselWrapper>
              {testimonials && testimonials.length > 0 ? (
                testimonials.map((testimonial: Testimonial) => (
                  <CarouselItem key={testimonial._id} className="pl-6 md:basis-1/2 lg:basis-1/4">
                    <div className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100/80 h-full">
                      <div className="p-6">
                        <div className="flex flex-col items-center">
                          <FallbackImage
                            src={testimonial.imageUrl ? urlFor(testimonial.imageUrl) : '/placeholder-image.jpg'}
                            alt={`Testimonial from ${testimonial.name || 'Anonymous'}`}
                            fallbackSrc="/placeholder-image.jpg"
                            width={150}
                            height={150}
                            className="rounded-full mb-4 transform group-hover:scale-105 transition-transform duration-300"
                          />
                          <h3 className="text-xl font-semibold mb-1">{testimonial.name || 'Anonymous'}</h3>
                          <p className="text-muted-foreground text-sm mb-4">{testimonial.location || 'Location not specified'}</p>
                          <p className="text-muted-foreground italic text-center">{testimonial.text || 'No testimonial text available'}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <p className="text-center text-muted-foreground w-full">No testimonials available at the moment.</p>
              )}
            </CarouselWrapper>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section id="blog" className="py-16 bg-white">
          <div className="container">
            <div className="flex justify-between items-center mb-12">
              <h2 className={`text-3xl font-bold ${montserrat.className}`}>Latest from the Blog</h2>
              <Button variant="outline" asChild className="flex items-center gap-2">
                <Link href="/blog">
                  View All Posts
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts && blogPosts.length > 0 ? (
                blogPosts.slice(0, 3).map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post._id} className="group">
                    <div className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100/80 h-full">
                      <div className="relative h-[220px] transform group-hover:scale-105 transition-transform duration-300 ease-in-out">
                        <FallbackImage
                          src={post.imageUrl}
                          alt={post.title}
                          fallbackSrc="/placeholder-image.jpg"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 border-t border-gray-100">
                        {post.publishedAt && (
                          <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <Clock className="h-4 w-4 mr-2" />
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        )}
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors duration-300">{post.title}</h3>
                        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                        <div className="mt-4 flex items-center text-blue-600 font-medium">
                          <span className="group-hover:underline">Read more</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-muted-foreground col-span-3">No blog posts available at the moment.</p>
              )}
            </div>
          </div>
        </section>

        {/* Partner with Me Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className={`text-3xl font-bold mb-4 ${montserrat.className}`}>Partner with Me</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Your support enables us to continue spreading the message of Kingdom Culture and discipleship worldwide. Join me in making a difference.
              </p>
              <Button 
                className="
                  bg-[#E879F9] hover:bg-[#E879F9]/90 
                  text-white font-semibold px-8 py-6 text-lg
                  transform hover:scale-105 
                  transition-all duration-300 ease-in-out
                  shadow-lg hover:shadow-[#E879F9]/25
                  rounded-full
                  relative overflow-hidden
                  group
                " 
                asChild
              >
                <Link href="https://give.tithe.ly/?formId=42e3f1ba-6865-11ee-90fc-1260ab546d11">
                  <span className="relative z-10 flex items-center gap-2">
                    Donate Now
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F0ABFC] to-[#E879F9] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="py-16 bg-[#F1F5F9]">
          <div className="container px-0">
            <h2 className={`text-3xl font-bold mb-8 ${montserrat.className}`}>Upcoming Events</h2>
            <CarouselWrapper>
              {upcomingEvents && upcomingEvents.length > 0 ? (
                upcomingEvents.map((event: Event) => (
                  <CarouselItem key={event._id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                    <div className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100/80 h-full">
                      <div className="h-[200px] relative transform group-hover:scale-105 transition-transform duration-300 ease-in-out">
                        <FallbackImage
                          src={event.imageUrl}
                          alt={event.title || 'Event'}
                          fallbackSrc="/placeholder-image.jpg"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 border-t border-gray-100">
                        <h3 className="text-xl font-semibold mb-3">{event.title || 'Untitled Event'}</h3>
                        {(event.date || event.location) && (
                          <div className="space-y-2 mb-4">
                            {event.date && (
                              <span className="flex items-center text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-2" />
                                {new Date(event.date).toLocaleDateString()}
                              </span>
                            )}
                            {event.location && (
                              <span className="flex items-center text-muted-foreground">
                                <Globe className="h-4 w-4 mr-2" />
                                {event.location}
                              </span>
                            )}
                          </div>
                        )}
                        <p className="text-sm text-muted-foreground mb-4">{event.description || 'No description available'}</p>
                        <div className="flex gap-2">
                          {event.learnMoreLink && (
                            <Button variant="outline" asChild className="flex-1">
                              <Link href={event.learnMoreLink}>Learn More</Link>
                            </Button>
                          )}
                          {event.registrationLink && (
                            <Button asChild className="flex-1">
                              <Link href={event.registrationLink}>Register Now</Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <p className="text-center text-muted-foreground w-full">No upcoming events at the moment.</p>
              )}
            </CarouselWrapper>
          </div>
        </section>

        {/* Mission Trips Section */}
        <section id="missions" className="py-16">
          <div className="container px-0">
            <h2 className={`text-3xl font-bold mb-8 ${montserrat.className}`}>Mission Trips</h2>
            <CarouselWrapper>
              {missions && missions.length > 0 ? (
                missions.map((mission: Mission) => (
                  <CarouselItem key={mission._id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                    <div className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100/80 h-full">
                      <div className="h-[200px] relative transform group-hover:scale-105 transition-transform duration-300 ease-in-out">
                        <FallbackImage
                          src={mission.imageUrl}
                          alt={mission.title || 'Mission Trip'}
                          fallbackSrc="/placeholder-image.jpg"
                          fill
                          className="object-cover"
                        />
                        {mission.status && (
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              mission.status === 'open' ? 'bg-green-100 text-green-800' :
                              mission.status === 'full' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {mission.status.charAt(0).toUpperCase() + mission.status.slice(1)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6 border-t border-gray-100">
                        <h3 className="text-xl font-semibold mb-3">{mission.title || 'Untitled Mission'}</h3>
                        <div className="space-y-2 mb-4">
                          {mission.startDate && mission.endDate && (
                            <span className="flex items-center text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-2" />
                              {new Date(mission.startDate).toLocaleDateString()} - {new Date(mission.endDate).toLocaleDateString()}
                            </span>
                          )}
                          {mission.location && (
                            <span className="flex items-center text-muted-foreground">
                              <Globe className="h-4 w-4 mr-2" />
                              {mission.location}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{mission.description || 'No description available'}</p>
                        {mission.cost && (
                          <p className="font-semibold mb-4">Cost: ${mission.cost}</p>
                        )}
                        {mission.status === 'open' && mission.registrationLink && (
                          <Button className="w-full" asChild>
                            <Link href={mission.registrationLink}>Register Now</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <p className="text-center text-muted-foreground w-full">No mission trips available at the moment.</p>
              )}
            </CarouselWrapper>
          </div>
        </section>

        {/* Books Section */}
        <section id="books" className="py-16 bg-[#F1F5F9]">
          <div className="container">
            <h2 className={`text-3xl font-bold mb-8 ${montserrat.className}`}>Books</h2>
            <div className="relative">
              <CarouselWrapper>
                {featuredBooks && featuredBooks.length > 0 ? (
                  featuredBooks.map((book: Book) => (
                    <CarouselItem key={book._id} className="pl-6 md:basis-1/2 lg:basis-1/4">
                      <div className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100/80 h-full">
                        <div className="relative h-[400px] transform group-hover:scale-105 transition-transform duration-300 ease-in-out">
                          <FallbackImage
                            src={book.imageUrl}
                            alt={`${book.title || 'Untitled Book'} cover`}
                            fallbackSrc="/placeholder-book.jpg"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6 border-t border-gray-100">
                          <h3 className="text-xl font-semibold mb-3">{book.title || 'Untitled Book'}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{book.description || 'No description available'}</p>
                          {book.link && (
                            <Button variant="outline" className="w-full gap-2" asChild>
                              <Link href={book.link}>
                                <BookOpen className="h-4 w-4" />
                                Purchase Book
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground w-full">No books available at the moment.</p>
                )}
              </CarouselWrapper>
            </div>
          </div>
        </section>

        {/* Newsletter Section - Temporarily disabled */}
        {/* <section className="py-16">
          <div className="container text-center">
            <h2 className={`text-3xl font-bold mb-4 ${montserrat.className}`}>Join Our Community</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Stay updated with Dr. Joshua Todd's latest teachings, events, and mission opportunities.
            </p>
            <NewsletterForm />
          </div>
        </section> */}
      </main>
    </div>
  )
}
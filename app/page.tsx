"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu, X, Calendar, Globe, BookOpen, ChevronRight, Users, Heart, WavesIcon as Wave, Crown } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Montserrat, Inter } from 'next/font/google'
import { useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const montserrat = Montserrat({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className={`flex flex-col min-h-screen ${inter.className}`}>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Dr. Joshua Todd</span>
          </Link>
          
          <button
            className="ml-auto md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <nav className="ml-auto hidden md:flex gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">About</Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#ministry">Ministry</Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#testimonials">Testimonials</Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#events">Events</Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#missions">Missions</Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#books">Books</Link>
          </nav>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="flex flex-col p-4">
              <Link 
                className="px-4 py-2 hover:bg-muted rounded-md text-sm font-medium" 
                href="#about"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                className="px-4 py-2 hover:bg-muted rounded-md text-sm font-medium" 
                href="#ministry"
                onClick={() => setIsMenuOpen(false)}
              >
                Ministry
              </Link>
              <Link 
                className="px-4 py-2 hover:bg-muted rounded-md text-sm font-medium" 
                href="#testimonials"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link 
                className="px-4 py-2 hover:bg-muted rounded-md text-sm font-medium" 
                href="#events"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                className="px-4 py-2 hover:bg-muted rounded-md text-sm font-medium" 
                href="#missions"
                onClick={() => setIsMenuOpen(false)}
              >
                Missions
              </Link>
              <Link 
                className="px-4 py-2 hover:bg-muted rounded-md text-sm font-medium" 
                href="#books"
                onClick={() => setIsMenuOpen(false)}
              >
                Books
              </Link>
            </nav>
          </div>
        )}
      </header>
      <main className="flex-1">
        <section className="relative min-h-[80vh] flex items-center justify-center py-24">
          <Image
            src="/heroImage.jpg"
            alt="Dr. Joshua Todd speaking on stage with artistic backdrop"
            fill
            className="absolute inset-0 object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center text-white pt-20">
            <h1 className={`text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-b from-gray-600 via-gray-400 to-gray-200 text-transparent bg-clip-text ${montserrat.className}`}>
              Dr. Joshua Todd
            </h1>
            <p className="mt-4 text-xl sm:text-2xl md:text-3xl">
              Fathering, Sonship, Kingdom Culture and more
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex flex-row gap-4 w-full sm:w-auto">
                <form className="flex items-center flex-1 sm:flex-initial">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/10 text-white placeholder-white/50 border-white/20 hover:bg-white/20 transition-colors duration-200 w-full sm:w-[300px]"
                    required
                    aria-label="Email for newsletter"
                  />
                </form>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white border-0 whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </div>
              <Button 
                asChild 
                className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white border-0 w-full sm:w-auto"
              >
                <Link href="#partner">Partner with Me</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 bg-muted">
          <div className="container">
            <div className="max-w-[1400px] mx-auto">
              <h2 className={`text-3xl font-bold mb-8 ${montserrat.className}`}>About Dr. Joshua Todd</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="/drJosh/drJoshSmiling.jpg"
                    alt="Dr. Joshua Todd portrait"
                    width={600}
                    height={600}
                    className="rounded-lg w-full max-w-[600px]"
                  />
                </div>
                <div>
                  <p className="text-lg mb-4">
                    Joshua Todd was born again in 1994 after a profound encounter with Jesus, accepting his call to ministry that same year. In his late teens, regular encounters with the Lord through His Word ignited a deep desire for a more meaningful relationship with God. A pivotal moment came in 1999 during a visit to Ireland, where he was baptized in the Holy Spirit. This life-changing experience set him on a global missionary journey and led him to pursue theological education.
                  </p>
                  <p className="text-lg mb-4">
                    Joshua studied at the Southern Baptist Theological Seminary, where he was introduced to deliverance ministry—a key element that has since shaped his life and leadership. He went on to earn a master’s degree from Wagner Leadership Institute and a doctorate from Kingdom Leadership Institute. Joshua has been happily married to Coral for 18 years, and they are blessed with two wonderful children, Mia and Joshua.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="#books">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="ministry" className="py-16">
          <div className="container">
            <h2 className={`text-3xl font-bold mb-8 ${montserrat.className}`}>Ministry Life</h2>
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {[
                  {
                    title: "Senior Leader at East Gate",
                    image: "/ministry/egkfDarkBg.png",
                    description: "As the Senior Leader at East Gate, Dr. Todd guides the spiritual growth and development of the community, fostering an environment of faith, love, and discipleship.",
                    icon: Users
                  },
                  {
                    title: "Healing Streams",
                    image: "/ministry/healingStreamsHorizontal.png",
                    description: "Through Healing Streams, Dr. Todd ministers to those in need of physical, emotional, and spiritual healing, bringing hope and restoration to many lives.",
                    icon: Heart
                  },
                  {
                    title: "The School of Encounter",
                    image: "/ministry/tsoeHorizontal2.png",
                    description: "Crest of The Wave is Dr. Todd's initiative to equip and empower the next generation of leaders, riding the forefront of spiritual awakening and cultural transformation.",
                    icon: Wave
                  },
                  {
                    title: "Kingdom Culture Training",
                    image: "/ministry/kingdom-culture.jpg",
                    description: "Developing and implementing training programs that establish Kingdom principles and values in individuals, families, and organizations.",
                    icon: Crown
                  },
                  {
                    title: "Global Missions",
                    image: "/ministry/global-missions.jpg",
                    description: "Leading missions and outreach initiatives worldwide, spreading the message of Kingdom Culture and establishing connections across nations.",
                    icon: Globe
                  }
                ].map((ministry, index) => (
                  <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <Card className="flex flex-col h-[600px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
                      <div className="h-[400px]">
                        <Image
                          src={ministry.image}
                          alt={ministry.title}
                          width={800}
                          height={400}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </div>
                      <CardHeader className="py-6">
                        <CardTitle className="flex items-center text-2xl">
                          <ministry.icon className="mr-2 h-6 w-6" />
                          {ministry.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-muted-foreground text-base">
                          {ministry.description}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        <section id="testimonials" className="py-16 bg-muted">
          <div className="container">
            <h2 className={`text-3xl font-bold mb-8 text-center ${montserrat.className}`}>Testimonials</h2>
            <Carousel className="w-full">
              <CarouselContent className="-ml-1">
                {[
                  { 
                    name: "Erich Rose", 
                    location: "Escondido, CA",
                    image: "/healingStreams/erichRose.jpg",
                    text: "Through the years, I've watched God meta morph Dr. Joshua Todd. He is not only an inspiration and big brother to me, but he is a clear example of what it means to walk as a new creation son."
                  },
                  { 
                    name: "Jatoria Battle", 
                    location: "Phoenix, AZ",
                    image: "/healingStreams/toriBattle.jpg",
                    text: "Dr. Joshua's leadership has transformed my husband and I by how we see ourselves as God's people, strengthened us in the call, and loved us into a place of healing. Dr. Joshua not only has apostolic and prophetic language, but he leads in a true biblical apostolic nature."
                  },
                  { 
                    name: "Tylor Trotter", 
                    location: "Jacksonville, FL",
                    image: "/healingStreams/tylorTrotter.jpg",
                    text: "Dr. Joshua's life is a demonstrative example of the leadership of Jesus. He is a true Father in the spirit who leads humbly with a towel wrapped around his waist prepared to wash feet at all times."
                  },
                  { 
                    name: "Victoria Guiterrez", 
                    location: "Jacksonville, Fl",
                    image: "/healingStreams/vickieNew.png",
                    text: "Dr. Joshua truly leads with the heart of the Father. I can attest to how he sees beyond the natural circumstances and connects with God’s destiny and purposes for individuals, cities, regions, and nations. What’s more, his leadership constantly challenges and inspires me to go beyond what I think is possible to pursue the “exceedingly and abundantly above all that I can imagine or think of!"
                  },
                  { 
                    name: "David Chen", 
                    location: "Los Angeles, CA",
                    image: "/healingStreams/davidChen.jpg",
                    text: "Dr. Todd's mentorship has been instrumental in my growth as a leader. His teachings on sonship and spiritual authority have helped me understand my true identity in Christ and how to walk in it daily."
                  }
                ].map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/4">
                    <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <CardHeader>
                        <Image
                          src={testimonial.image}
                          alt={`Testimonial from ${testimonial.name}`}
                          width={150}
                          height={150}
                          className="rounded-full mx-auto object-cover"
                        />
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="italic text-sm">"{testimonial.text}"</p>
                      </CardContent>
                      <CardFooter className="mt-auto text-center">
                        <p className="font-semibold">- {testimonial.name}, {testimonial.location}</p>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        <section id="partner" className="py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Partner with Me</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Your support enables us to continue spreading the message of Kingdom Culture and discipleship worldwide. Join me in making a difference.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
              Donate Now
            </Button>
          </div>
        </section>

        <section id="events" className="py-16 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Kingdom Culture Conference 2024",
                  date: "March 15-17, 2024",
                  location: "Jacksonville, Florida",
                  description: "A three-day immersive conference exploring Kingdom principles, spiritual authority, and supernatural lifestyle. Join us for powerful worship, transformative teaching, and prophetic ministry.",
                  image: "/events/kingdom-culture-conf.jpg",
                  registrationLink: "/events/kingdom-culture-2024"
                },
                {
                  title: "Healing Streams Intensive",
                  date: "April 22-24, 2024",
                  location: "Phoenix, Arizona",
                  description: "An intensive training weekend focused on healing ministry, deliverance, and walking in supernatural power. Learn practical tools for ministering healing and activating your spiritual gifts.",
                  image: "/events/healing-streams.jpg",
                  registrationLink: "/events/healing-streams-2024"
                },
                {
                  title: "Fathers & Sons Retreat",
                  date: "May 18-20, 2024",
                  location: "Colorado Springs, Colorado",
                  description: "A special weekend dedicated to strengthening the bonds between spiritual fathers and sons. Experience deep fellowship, mentoring, and activation in your spiritual inheritance.",
                  image: "/events/fathers-sons.jpg",
                  registrationLink: "/events/fathers-sons-2024"
                }
              ].map((event, index) => (
                <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="h-[200px] relative">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="flex flex-col gap-1">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" asChild>
                      <Link href={event.registrationLink}>Learn More</Link>
                    </Button>
                    <Button>Register Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="missions" className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">Upcoming Mission Trips</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((mission) => (
                <Card key={mission} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle>Mission to Location {mission}</CardTitle>
                    <CardDescription>
                      <Globe className="inline-block mr-2" />
                      Date Range: Month - Month, Year
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Brief description of the mission trip. Objectives and impact.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Get Involved</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="books" className="py-16 bg-muted">
          <div className="container">
            <h2 className={`text-3xl font-bold mb-8 ${montserrat.className}`}>Books by Dr. Joshua Todd</h2>
            <Carousel className="w-full">
              <CarouselContent className="-ml-1">
                {[
                  {
                    title: "Inheritance Invasion",
                    image: "/books/inheritance-invasion.jpg",
                    description: "Discover the principles of living and leading in God's Kingdom culture, transforming communities through biblical values.",
                    link: "/books/inheritance-invasion"
                  },
                  {
                    title: "Purified Power",
                    image: "/books/purified-power.jpg",
                    description: "Explore the depth of God's father heart and how it transforms our identity, relationships, and purpose.",
                    link: "/books/purified-power"
                  },
                  {
                    title: "Seasons of Sonship",
                    image: "/books/seasons-of-sonship.jpg",
                    description: "Understanding your identity as a son/daughter of God and walking in the fullness of your spiritual inheritance.",
                    link: "/books/seasons-of-sonship"
                  },
                  {
                    title: "Honor's Pathway",
                    image: "/books/honors-pathway.jpg",
                    description: "A practical guide to building a culture of honor in your life, family, and organization.",
                    link: "/books/honors-pathway"
                  },
                  {
                    title: "Kingdom Authority",
                    image: "/books/kingdom-authority.jpg",
                    description: "Learn to walk in the authority that God has given you as His representative in the earth.",
                    link: "/books/kingdom-authority"
                  },
                  {
                    title: "Spiritual DNA",
                    image: "/books/spiritual-dna.jpg",
                    description: "Understand your spiritual inheritance and how to activate the gifts within you.",
                    link: "/books/spiritual-dna"
                  }
                ].map((book, index) => (
                  <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/4">
                    <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <div>
                        <Image
                          src={book.image}
                          alt={`${book.title} book cover`}
                          width={400}
                          height={600}
                          className="w-full object-cover h-[400px]"
                        />
                        <CardHeader className="py-4">
                          <CardTitle className="text-xl">
                            {book.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="py-2">
                          <p className="text-sm text-muted-foreground">
                            {book.description}
                          </p>
                        </CardContent>
                      </div>
                      <CardFooter className="mt-auto py-4">
                        <Button variant="outline" className="w-full" asChild>
                          <Link href={book.link}>
                            <BookOpen className="mr-2" />
                            Learn More
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        <section className="py-16">
          <div className="container text-center">
            <h2 className={`text-3xl font-bold mb-4 ${montserrat.className}`}>Join Our Community</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Stay updated with Dr. Joshua Todd's latest teachings, events, and mission opportunities.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white border-0">
              Subscribe to Newsletter
              <ChevronRight className="ml-2" />
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose md:text-left">
              © 2024 Dr. Joshua Todd. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm hover:underline underline-offset-4">Privacy Policy</Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">Terms of Service</Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu, X, Calendar, Globe, BookOpen, ChevronRight, Users, Heart, WavesIcon as Wave, Crown } from 'lucide-react'
import { Input } from "@/components/ui/input"
import localFont from 'next/font/local'
import { Montserrat, Inter } from 'next/font/google'
import { useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'] })

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const donateUrl = "https://give.tithe.ly/?formId=fc03799a-0541-44e4-91a9-d53c7f5fd9d3&locationId=ebb1aab5-ff12-4129-8311-983143e7db4f&fundId=62ddfc18-4b94-41ac-978c-3b14d9cdc37c"

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
                <Link href={donateUrl}>Partner with Me</Link>
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
                    src="/drJosh/drJoshSmilingMic.jpg"
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
                    Joshua studied at the Southern Baptist Theological Seminary, where he was introduced to deliverance ministry—a key element that has since shaped his life and leadership. He went on to earn a master's degree from Wagner Leadership Institute and a doctorate from Kingdom Leadership Institute. Joshua has been happily married to Coral for 18 years, and they are blessed with two wonderful children, Mia and Joshua.
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
            <div className="relative px-8 md:px-12">
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
                      title: "Elder at The Well Global Alliance",
                      image: "/ministry/twgaElder.png",
                      description: "Developing and implementing training programs that establish Kingdom principles and values in individuals, families, and organizations.",
                      icon: Crown
                    },
                    {
                      title: "The Crest of the Wave",
                      image: "/ministry/CoTW.png",
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
                <CarouselPrevious className="absolute -left-3 md:-left-6" />
                <CarouselNext className="absolute -right-3 md:-right-6" />
              </Carousel>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 bg-muted">
          <div className="container">
            <h2 className={`text-3xl font-bold mb-8 text-center ${montserrat.className}`}>Testimonials</h2>
            <div className="relative px-8 md:px-12">
              <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                  {[
                    { 
                      name: "Erich Rose", 
                      location: "Escondido, CA",
                      image: "/healingStreams/erichRose.JPG",
                      text: "Through the years, I've watched God meta morph Dr. Joshua Todd. He is not only an inspiration and big brother to me, but he is a clear example of what it means to walk as a new creation son."
                    },
                    { 
                      name: "Jatoria Battle", 
                      location: "Phoenix, AZ",
                      image: "/healingStreams/toriBattle.JPG",
                      text: "Dr. Joshua's leadership has transformed my husband and I by how we see ourselves as God's people, strengthened us in the call, and loved us into a place of healing. Dr. Joshua not only has apostolic and prophetic language, but he leads in a true biblical apostolic nature."
                    },
                    { 
                      name: "Tylor Trotter", 
                      location: "Jacksonville, FL",
                      image: "/healingStreams/tylorTrotter.JPG",
                      text: "Dr. Joshua's life is a demonstrative example of the leadership of Jesus. He is a true Father in the spirit who leads humbly with a towel wrapped around his waist prepared to wash feet at all times."
                    },
                    { 
                      name: "Victoria Guiterrez", 
                      location: "Jacksonville, Fl",
                      image: "/healingStreams/vickieNew.png",
                      text: "Dr. Joshua truly leads with the heart of the Father. I can attest to how he sees beyond the natural circumstances and connects with God's destiny and purposes for individuals, cities, regions, and nations. What's more, his leadership constantly challenges and inspires me to go beyond what I think is possible to pursue the 'exceedingly and abundantly above all that I can imagine or think of!'"
                    },
                    { 
                      name: "Sean Harvey", 
                      location: "Piedmont, SC",
                      image: "/healingStreams/harveyFam.png",
                      text: "As a transformational kingdom leader Dr. Joshua Todd lives the message of being shaped into the likeness of Christ through the power of the Cross and the Spirit. He exemplifies the truth that it is for freedom we have been set free. His passionate commitment to Jesus is made manifest in relational first lifestyle of leadership."
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
                <CarouselPrevious className="absolute -left-3 md:-left-6" />
                <CarouselNext className="absolute -right-3 md:-right-6" />
              </Carousel>
            </div>
          </div>
        </section>

        <section id="partner" className="py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Partner with Me</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Your support enables us to continue spreading the message of Kingdom Culture and discipleship worldwide. Join me in making a difference.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
              <Link href="https://give.tithe.ly/?formId=fc03799a-0541-44e4-91a9-d53c7f5fd9d3&locationId=ebb1aab5-ff12-4129-8311-983143e7db4f&fundId=62ddfc18-4b94-41ac-978c-3b14d9cdc37c">
                Donate Now
              </Link>
            </Button>
          </div>
        </section>

        <section id="events" className="py-16 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">Past and Upcoming Events</h2>
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
              ].slice(0, 1).map((event, index) => (
                <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="h-[200px] relative">
                    {/* Comment out until you have the images */}
                    {/*<Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />*/}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="flex flex-col gap-1">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date}
                      </span>
                      <span className="flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        {event.location}
                      </span>
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
              {[
                {
                  title: "Healing Streams Australia",
                  dateRange: "March 26th - April 6th, 2025",
                  location: "Australia",
                  description: "Join us in empowering local churches and communities through leadership training and ministry outreach.",
                  link: "/missions/kenya-2024"
                },
                {
                  title: "India Outreach",
                  dateRange: "August 10-25, 2024",
                  location: "Mumbai, India",
                  description: "Supporting local ministries and conducting Kingdom Culture training sessions across multiple cities.",
                  link: "/missions/india-2024"
                },
                {
                  title: "European Kingdom Tour",
                  dateRange: "October 5-20, 2024",
                  location: "Multiple Cities, Europe",
                  description: "A strategic mission trip across Europe, establishing Kingdom connections and conducting leadership conferences.",
                  link: "/missions/europe-2024"
                }
              ].slice(0, 1).map((mission) => (
                <Card key={mission.title} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle>{mission.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {mission.dateRange}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Globe className="h-4 w-4" />
                        {mission.location}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{mission.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild>
                      <Link href={mission.link}>Get Involved</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="books" className="py-16 bg-muted">
          <div className="container">
            <h2 className={`text-3xl font-bold mb-8 ${montserrat.className}`}>Books by Dr. Joshua Todd</h2>
            <div className="relative px-8 md:px-12">
              <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                  {[
                    {
                      title: "Inheritance Invasion",
                      image: "/Books/inheritanceInvasion.png",
                      description: "Discover the principles of living and leading in God's Kingdom culture, transforming communities through biblical values.",
                      link: "https://www.amazon.com/Inheritance-Invasion-Turning-transfer-Transfer/dp/1548507520/ref=sr_1_1?crid=VFNVXIX5YW7T&dib=eyJ2IjoiMSJ9.eoK3dmVR0ymrwb-Bx_3nqg.9HPsoMsmLdsJYEMOTw_k5cOfxfl6bqDwBhpgxi2n9WA&dib_tag=se&keywords=inheritance+invasion+Joshua+Todd&qid=1732117027&sprefix=inheritance+invasion+joshua+tod%2Caps%2C140&sr=8-1"
                    },
                    {
                      title: "Purified Power",
                      image: "/Books/PurifiedPower.png",
                      description: "Explore the depth of God's father heart and how it transforms our identity, relationships, and purpose.",
                      link: "https://www.amazon.com/Purified-Power-Prophetic-Action/dp/B08DPWNN7W/ref=sr_1_1?crid=2A4EZHW65RZYE&dib=eyJ2IjoiMSJ9.d8cZHlvVoFdN9VpL9Srt0A.cT4fmDfsoskrXtjniVTsP3Lb8LDxsjDBSCtkq3RsaOo&dib_tag=se&keywords=purified+power+Joshua+Todd&qid=1732117055&sprefix=purified+powerjoshua+todd%2Caps%2C111&sr=8-1"
                    },
                    {
                      title: "Seasons of Sonship - Foundations",
                      image: "/Books/SoSBook1.png",
                      description: "Understanding your identity as a son/daughter of God and walking in the fullness of your spiritual inheritance.",
                      link: "https://www.amazon.com/Seasons-Sonship-Foundations-Book-1/dp/1790544602/ref=sr_1_1?crid=3K2AGF6J7X3DX&dib=eyJ2IjoiMSJ9.1XgmpP1o0q4VdDl6Q1fXRYOKosmzMhpWTCrWzcjVzp3GjHj071QN20LucGBJIEps.Wenn8yiK3arY6vElefwh8emWzDHgCnAwvvISyb_wDvc&dib_tag=se&keywords=seasons+of+sonship+foundations+Joshua+Todd&qid=1732117090&sprefix=seasons+of+sonship+foundations+joshua+todd%2Caps%2C129&sr=8-1"
                    },
                    {
                      title: "Seasons of Sonship - Invitation",
                      image: "/Books/SoSBook2.png",
                      description: "A practical guide to building a culture of honor in your life, family, and organization.",
                      link: "https://www.amazon.com/Seasons-Sonship-Invitation-Joshua-Todd/dp/B088LH2WLB/ref=sr_1_2?crid=3K2AGF6J7X3DX&dib=eyJ2IjoiMSJ9.1XgmpP1o0q4VdDl6Q1fXRYOKosmzMhpWTCrWzcjVzp3GjHj071QN20LucGBJIEps.Wenn8yiK3arY6vElefwh8emWzDHgCnAwvvISyb_wDvc&dib_tag=se&keywords=seasons+of+sonship+foundations+Joshua+Todd&qid=1732117090&sprefix=seasons+of+sonship+foundations+joshua+todd%2Caps%2C129&sr=8-2"
                    },
                    {
                      title: "Seasons of Sonship - Interdependence",
                      image: "/Books/SoSBook3.png",
                      description: "Learn to walk in the authority that God has given you as His representative in the earth.",
                      link: "https://www.amazon.com/Seasons-Sonship-Interdependence-Joshua-Todd/dp/B09QF44HKX/ref=sr_1_1?crid=2BMCDX51P45B7&dib=eyJ2IjoiMSJ9.lcLuHBsZFyy1rvtFn_87Xe8mQAL-WLt60TQL4Zp7mlzGjHj071QN20LucGBJIEps.iPpDjJf3MiRBNfISDIDbytVL_GRKkeACYVhFw9UrUkQ&dib_tag=se&keywords=seasons+of+sonship+interdependence&qid=1732055281&sprefix=seasons+of+sonship+interdependence%2Caps%2C121&sr=8-1"
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
                <CarouselPrevious className="absolute -left-3 md:-left-6" />
                <CarouselNext className="absolute -right-3 md:-right-6" />
              </Carousel>
            </div>
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
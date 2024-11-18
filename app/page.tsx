import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Globe, BookOpen, ChevronRight, Users, Heart, WavesIcon as Wave } from 'lucide-react'
import { Input } from "@/components/ui/input"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Dr. Joshua Todd</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">About</Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#ministry">Ministry</Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#testimonials">Testimonials</Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#events">Events</Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#missions">Missions</Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#books">Books</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative min-h-[80vh] flex items-center justify-center py-24">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/heroImage.jpg-LiR10nTRucykNbvD4pvPzXjXV3LH5d.jpeg"
            alt="Dr. Joshua Todd speaking on stage with artistic backdrop"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center text-white pt-20">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-transparent bg-clip-text">
              Dr. Joshua Todd
            </h1>
            <p className="mt-4 text-xl sm:text-2xl md:text-3xl">
              Fathering, Sonship, Kingdom Culture and more
            </p>
            <div className="mt-8 flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <form className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 text-white placeholder-white/50 border-white/20"
                  required
                  aria-label="Email for newsletter"
                />
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white border-0"
                >
                  Subscribe
                </Button>
              </form>
              <Button 
                asChild 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
              >
                <Link href="#partner">Partner with Me</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">About Dr. Joshua Todd</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Dr. Joshua Todd portrait"
                width={400}
                height={400}
                className="rounded-lg"
              />
              <div>
                <p className="text-lg mb-4">
                  Dr. Joshua Todd is a renowned author, speaker, and missionary dedicated to spreading the message of Kingdom Culture, honor, and discipleship across the globe.
                </p>
                <p className="text-lg mb-4">
                  With years of experience in ministry and a passion for teaching, Dr. Todd has touched countless lives through his books, speaking engagements, and mission trips.
                </p>
                <Button variant="outline" asChild>
                  <Link href="#books">Explore My Books</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="ministry" className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">Ministry Life</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2" />
                    Senior Leader at East Gate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>As the Senior Leader at East Gate, Dr. Todd guides the spiritual growth and development of the community, fostering an environment of faith, love, and discipleship.</p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="mr-2" />
                    Healing Streams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Through Healing Streams, Dr. Todd ministers to those in need of physical, emotional, and spiritual healing, bringing hope and restoration to many lives.</p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wave className="mr-2" />
                    Crest of The Wave
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Crest of The Wave is Dr. Todd's initiative to equip and empower the next generation of leaders, riding the forefront of spiritual awakening and cultural transformation.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((testimonial) => (
                <Card key={testimonial} className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <Image
                      src={`/placeholder.svg?height=150&width=150&text=Person+${testimonial}`}
                      alt={`Testimonial ${testimonial}`}
                      width={150}
                      height={150}
                      className="rounded-full mx-auto"
                    />
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="italic">"Dr. Joshua Todd's teachings have transformed my life and ministry. His insights on Kingdom Culture have opened my eyes to a new level of understanding God's purpose for His people."</p>
                  </CardContent>
                  <CardFooter className="text-center">
                    <p className="font-semibold">- John Doe, Pastor</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
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
              {[1, 2, 3].map((event) => (
                <Card key={event} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle>Event Title {event}</CardTitle>
                    <CardDescription>
                      <Calendar className="inline-block mr-2" />
                      Date: Month Day, Year
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Brief description of the event. Location and other relevant details.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Learn More</Button>
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
            <h2 className="text-3xl font-bold mb-8">Books by Dr. Joshua Todd</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((book) => (
                <Card key={book} className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <Image
                    src={`/placeholder.svg?height=300&width=200&text=Book+${book}`}
                    alt={`Book ${book} cover`}
                    width={200}
                    height={300}
                    className="w-full object-cover"
                  />
                  <CardHeader>
                    <CardTitle>Book Title {book}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>Brief description of the book and its main themes.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <BookOpen className="mr-2" />
                      Read More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
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
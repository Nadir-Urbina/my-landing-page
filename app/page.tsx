import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Globe, BookOpen, ChevronRight, Users, Heart, WavesIcon as Wave } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

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
            src="/heroImage.jpg"
            alt="Dr. Joshua Todd speaking on stage with artistic backdrop"
            fill
            className="absolute inset-0 object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center text-white pt-20">
            <h1 className={`text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-transparent bg-clip-text ${montserrat.className}`}>
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
                  className="bg-white/10 text-white placeholder-white/50 border-white/20 hover:bg-white/20 transition-colors duration-200"
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
                className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white border-0"
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
                src="/drJosh/drJoshSmilingMic.jpg"
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
                <Image
                  src="/ministry/senior-leader.jpg"
                  alt="Senior Leader at East Gate"
                  width={400}
                  height={250}
                  className="w-full object-cover h-[200px]"
                />
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
                <Image
                  src="/ministry/healing-streams.jpg"
                  alt="Healing Streams Ministry"
                  width={400}
                  height={250}
                  className="w-full object-cover h-[200px]"
                />
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
                <Image
                  src="/ministry/crest-wave.jpg"
                  alt="Crest of The Wave Ministry"
                  width={400}
                  height={250}
                  className="w-full object-cover h-[200px]"
                />
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
              {[
                { 
                  name: "Erich Rose", 
                  location: "Escondido, CA",
                  image: "/healingStreams/erichRose.jpg",
                  text: "Through the years, I’ve watched God meta morph Dr. Joshua Todd. He is not only an inspiration and big brother to me, but he is a clear example of what it means to walk as a new creation son."
                },
                { 
                  name: "Jatoria Battle", 
                  location: "Phoenix, AZ",
                  image: "/healingStreams/toriBattle.jpg",
                  text: "Dr. Joshua’s leadership has transformed my husband and I by how we see ourselves as God’s people, strengthened us in the call, and loved us into a place of healing. Dr. Joshua not only has apostolic and prophetic language, but he leads in a true biblical apostolic nature. He matures the body of Christ so they can be ready to respond to God."
                },
                { 
                  name: "Tylor Trotter", 
                  location: "Jacksonville, FL",
                  image: "/healingStreams/tylorTrotter.jpg",
                  text: "Dr. Joshua’s life is a demonstrative example of the leadership of Jesus. He is a true Father in the spirit who leads humbly with a towel wrapped around his waist prepared to wash feet at all times. The authority he carries is only surpassed by his willingness to lay his life down in service to those whom God has placed in front of him."
                }
              ].map((testimonial, index) => (
                <Card key={index} className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
                    <p className="italic">"{testimonial.text}"</p>
                  </CardContent>
                  <CardFooter className="text-center">
                    <p className="font-semibold">- {testimonial.name}, {testimonial.location}</p>
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
              {[
                {
                  title: "Inheritance Invasion",
                  image: "/Books/inheritance invasion.jpg",
                  description: "Discover the principles of living and leading in God's Kingdom culture, transforming communities through biblical values.",
                  link: "/books/kingdom-culture"
                },
                {
                  title: "Purified Power",
                  image: "/Books/Purified Power.jpg",
                  description: "Explore the depth of God's father heart and how it transforms our identity, relationships, and purpose.",
                  link: "/books/fathers-heart"
                },
                {
                  title: "Seasons of Sonship - Book 1",
                  image: "/Books/Seasons of Sonship Book 1.jpg",
                  description: "Understanding your identity as a son/daughter of God and walking in the fullness of your spiritual inheritance.",
                  link: "/books/sonship"
                },
                {
                  title: "Honor's Pathway",
                  image: "/books/honors-pathway.jpg",
                  description: "A practical guide to building a culture of honor in your life, family, and organization.",
                  link: "/books/honors-pathway"
                }
              ].map((book, index) => (
                <Card key={index} className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
                  <CardFooter className="py-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={book.link}>
                        <BookOpen className="mr-2" />
                        Learn More
                      </Link>
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
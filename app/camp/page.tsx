import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Montserrat } from 'next/font/google'
import { Input } from '@/components/ui/input'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function CampPage() {
  return (
    <main className="flex-1">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-white bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/40 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/camp/camp-hero.jpg" // You'll need to add this image
            alt="CAMP Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container relative z-10 text-white">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${montserrat.className}`}>
            CAMP
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl">
            A sacred gathering space where prayer warriors are equipped and empowered
          </p>
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
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Strategic Intercession</h3>
                <p className="text-muted-foreground">Equipping prayer warriors with powerful intercession strategies</p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Prophetic Mentoring</h3>
                <p className="text-muted-foreground">Developing Christ-centered leadership through prophetic guidance</p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Covenant Alignment</h3>
                <p className="text-muted-foreground">Building deep relational bonds in kingdom family</p>
              </CardContent>
            </Card>

            {/* Additional Features */}
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Prevailing Prayer</h3>
                <p className="text-muted-foreground">
                  Mastering the art of effective and persistent prayer, learning to stand in faith until breakthrough manifests.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">High Courts of the Lord</h3>
                <p className="text-muted-foreground">
                  Understanding and operating in heavenly judicial systems, learning to present cases before the throne.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardContent className="p-6">
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
            <form className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                required
              />
              <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                Send Me Info
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
} 
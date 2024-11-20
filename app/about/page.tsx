"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="container py-16">
        <h1 className={`text-4xl font-bold mb-8 ${montserrat.className}`}>About Dr. Joshua Todd</h1>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <Image
              src="/drJosh/drJoshSmilingMic.jpg"
              alt="Dr. Joshua Todd"
              width={600}
              height={600}
              className="rounded-lg w-full"
            />
          </div>
          <div className="space-y-6">
            <h2 className={`text-2xl font-semibold ${montserrat.className}`}>Early Life & Calling</h2>
            <p className="text-lg">
              Joshua Todd was born again in 1994 after a profound encounter with Jesus, accepting his call to ministry that same year. In his late teens, regular encounters with the Lord through His Word ignited a deep desire for a more meaningful relationship with God.
            </p>
            <p className="text-lg">
              A pivotal moment came in 1999 during a visit to Ireland, where he was baptized in the Holy Spirit. This life-changing experience set him on a global missionary journey and led him to pursue theological education.
            </p>
          </div>
        </div>

        <div className="space-y-12 mb-16">
          <div>
            <h2 className={`text-2xl font-semibold mb-4 ${montserrat.className}`}>Education & Training</h2>
            <p className="text-lg">
              Joshua studied at the Southern Baptist Theological Seminary, where he was introduced to deliverance ministry—a key element that has since shaped his life and leadership. He went on to earn a master's degree from Wagner Leadership Institute and a doctorate from Kingdom Leadership Institute.
            </p>
          </div>

          <div>
            <h2 className={`text-2xl font-semibold mb-4 ${montserrat.className}`}>Ministry Focus</h2>
            <p className="text-lg mb-4">
              Dr. Todd's ministry focuses on several key areas:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg ml-4">
              <li>Kingdom Culture Development</li>
              <li>Spiritual Fathering and Sonship</li>
              <li>Healing and Deliverance Ministry</li>
              <li>Leadership Development</li>
              <li>Global Missions and Church Planting</li>
            </ul>
          </div>

          <div>
            <h2 className={`text-2xl font-semibold mb-4 ${montserrat.className}`}>Current Leadership</h2>
            <p className="text-lg">
              Currently serving as the Senior Leader at East Gate Kingdom Fellowship, Dr. Todd continues to impact lives through his various ministry initiatives, including Healing Streams, The School of Encounter, and his role as an Elder at The Well Global Alliance.
            </p>
          </div>

          <div>
            <h2 className={`text-2xl font-semibold mb-4 ${montserrat.className}`}>Family Life</h2>
            <p className="text-lg">
              Joshua has been happily married to Coral for 18 years, and they are blessed with two wonderful children, Mia and Joshua. Their family stands as a testament to the principles of Kingdom culture and family values that Dr. Todd teaches.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className={`text-2xl font-semibold mb-6 ${montserrat.className}`}>Connect with Dr. Todd</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="#events">Upcoming Events</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="#books">View Books</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 mt-16">
        <div className="container text-center text-sm">
          © 2024 Dr. Joshua Todd. All rights reserved.
        </div>
      </footer>
    </div>
  )
} 
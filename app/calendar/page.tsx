import { Calendar } from '@/components/calendar'
import { getCalendarEvents } from '@/lib/sanity.client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 0

export default async function CalendarPage() {
  const events = await getCalendarEvents()
  
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

      <section className="py-24 bg-gradient-to-b from-purple-50 to-white">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Speaking Schedule</h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            View upcoming events and speaking engagements
          </p>
          <Calendar events={events} />
        </div>
      </section>
    </main>
  )
} 
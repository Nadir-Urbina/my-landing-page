import HealingStreamsClient from './client'
import { getHealingStreamsTestimonials, getHealingStreamsEvents } from '@/lib/sanity.client'

export default async function HealingStreamsPage() {
  const testimonials = await getHealingStreamsTestimonials()
  const events = await getHealingStreamsEvents()

  return <HealingStreamsClient testimonials={testimonials} events={events} />
}
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-07',
  useCdn: process.env.NODE_ENV === 'production',
})

export async function getTestimonials() {
  const testimonials = await client.fetch(`
    *[_type == "testimonial"] {
      _id,
      name,
      location,
      text,
      "imageUrl": image.asset->url
    }
  `)
  console.log('Raw testimonials data:', testimonials)
  return testimonials
}

export async function getEvents() {
  return client.fetch(`
    *[_type == "event"] | order(date asc) {
      _id,
      title,
      date,
      location,
      description,
      "imageUrl": image.asset->url,
      learnMoreLink,
      registrationLink
    }
  `)
}

export async function getBooks() {
  return client.fetch(`
    *[_type == "book"] | order(publishDate desc) {
      _id,
      title,
      description,
      "imageUrl": image.asset->url,
      link,
      publishDate,
      featured
    }
  `)
}

export async function getMissions() {
  const missions = await client.fetch(`
    *[_type == "mission"] {
      _id,
      title,
      location,
      startDate,
      endDate,
      description,
      "imageUrl": image.asset->url,
      cost,
      status,
      registrationLink
    }
  `)
  console.log('Raw missions data:', missions)
  return missions
}

export async function getFeaturedBooks(): Promise<Book[]> {
  return client.fetch(
    `*[_type == "book"] {
      _id,
      title,
      description,
      "imageUrl": image.asset->url,
      link
    }`
  )
}

export async function getUpcomingEvents() {
  const now = new Date().toISOString()
  return client.fetch(`
    *[_type == "event" && date > $now] | order(date asc) [0...3] {
      _id,
      title,
      date,
      location,
      description,
      "imageUrl": image.asset->url,
      learnMoreLink,
      registrationLink
    }
  `, { now })
} 
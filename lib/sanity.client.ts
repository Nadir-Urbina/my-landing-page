import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { Book, Event, Mission, Testimonial, Post, CalendarEvent, HealingStreamsTestimonial, HealingStreamsEvent } from '@/types/sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource): string {
  return builder.image(source).url()
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    `*[_type == "testimonial"] {
      _id,
      name,
      location,
      text,
      "imageUrl": image.asset->url
    }`
  )
}

export async function getEvents(): Promise<Event[]> {
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

export async function getBooks(): Promise<Book[]> {
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

export async function getMissions(): Promise<Mission[]> {
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

export async function getUpcomingEvents(): Promise<Event[]> {
  return client.fetch(`
    *[_type == "event"] | order(date asc) {
      _id,
      title,
      description,
      "imageUrl": image.asset->url,
      date,
      location,
      learnMoreLink,
      registrationLink
    }
  `)
}

export async function getHealingStreamsContent() {
  const query = `*[_type == "healingStreams"][0] {
    _id,
    title,
    description,
    "imageUrl": image.asset->url,
    "galleryImages": galleryImages[].asset->url,
    testimonials[]->{
      _id,
      name,
      location,
      text,
      "imageUrl": image.asset->url
    },
    upcomingEvents[]->{
      _id,
      title,
      date,
      location,
      description,
      "imageUrl": image.asset->url,
      learnMoreLink,
      registrationLink
    }
  }`

  const content = await client.fetch(query)
  return content
}

export async function getPosts(): Promise<Post[]> {
  console.log('Fetching posts...')
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      "imageUrl": mainImage.asset->url
    }
  `)
  console.log('Posts fetched:', posts)
  return posts
}

export async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      "imageUrl": mainImage.asset->url,
      body
    }
  `, { slug })
}

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  console.log('Fetching calendar events...')
  const events = await client.fetch(`
    *[_type == "calendarEvent"] | order(startDate asc) {
      _id,
      title,
      startDate,
      endDate,
      location,
      description,
      eventType,
      registrationLink,
      "imageUrl": image.asset->url
    }
  `)
  console.log('Calendar events fetched:', events)
  return events
}

export async function getHealingStreamsTestimonials(): Promise<HealingStreamsTestimonial[]> {
  return client.fetch(`
    *[_type == "healingStreamsTestimonial"] | order(date desc) {
      _id,
      name,
      location,
      text,
      date,
      "imageUrl": image.asset->url,
      healingType
    }
  `)
}

export async function getHealingStreamsEvents(): Promise<HealingStreamsEvent[]> {
  return client.fetch(`
    *[_type == "healingStreamsEvent"] | order(date asc) {
      _id,
      title,
      date,
      location,
      description,
      imageUrl,
      registrationLink
    }
  `)
} 
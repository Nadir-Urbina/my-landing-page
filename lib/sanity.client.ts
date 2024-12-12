import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source).url()
}

export async function getTestimonials() {
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

export async function getHealingStreamsContent() {
  const query = `*[_type == "healingStreams"] {
    _id,
    title,
    description,
    image,
    // add other fields you need
  }`

  const content = await client.fetch(query)
  return content
} 
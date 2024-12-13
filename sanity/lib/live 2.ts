import { createClient } from 'next-sanity'
import { client } from './client'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export const previewClient = createClient({
  projectId,
  dataset,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

export const getClient = (usePreview: boolean) => usePreview ? previewClient : client

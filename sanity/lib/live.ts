import { createClient } from '@sanity/client'
import { dataset, projectId, useCdn } from '../env'

export const client = createClient({
  projectId,
  dataset,
  useCdn,
  apiVersion: '2024-01-01',
  perspective: 'published',
})

export const previewClient = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_READ_TOKEN,
})

export function getClient(preview: boolean = false) {
  return preview ? previewClient : client
}

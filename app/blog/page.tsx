import { BlogContent } from '@/components/blog-content'
import { getPosts } from '@/lib/sanity.client'

export const revalidate = 0

export default async function BlogPage() {
  const posts = await getPosts()
  
  return <BlogContent posts={posts} />
}

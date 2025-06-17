import Image from 'next/image'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'
import { ArrowLeft } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { getPost } from '@/lib/sanity.client'
import { PortableText } from '@portabletext/react'
import { components } from '@/components/portable-text'

const montserrat = Montserrat({ subsets: ['latin'] })

// Disable cache for this page to always fetch latest data
export const revalidate = 0

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    return (
      <main className="flex-1">
        <div className="container py-20">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <Link href="/blog" className="text-blue-500 hover:underline mt-4 inline-block">
            Back to blog
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          href="/blog"
          className="flex items-center gap-2 px-4 py-2 text-white bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/40 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          {post.imageUrl && (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold ${montserrat.className}`}>
            {post.title}
          </h1>
          <p className="mt-4 text-lg">
            {formatDate(post.publishedAt)}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="prose prose-lg dark:prose-invert">
            <PortableText 
              value={post.body} 
              components={components}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

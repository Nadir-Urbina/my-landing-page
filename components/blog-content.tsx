'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from '@/lib/utils'
import { Post } from '@/types/sanity'
import { motion } from 'framer-motion'
import { Search } from '@/components/search'
import { ArrowLeft } from 'lucide-react'

const montserrat = Montserrat({ subsets: ['latin'] })

interface BlogContentProps {
  posts: Post[]
}

export function BlogContent({ posts }: BlogContentProps) {
  const [filteredPosts, setFilteredPosts] = useState(posts)

  const handleSearch = (query: string) => {
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredPosts(filtered)
  }

  return (
    <main className="flex-1">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-black bg-white/80 backdrop-blur-sm rounded-full 
          hover:bg-white/90 transition-all duration-300 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-background overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/drJosh/DrJoshHeroImg.jpg"
            alt="Blog Hero"
            fill
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-background/80" />
        </div>
        
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className={`text-4xl md:text-5xl font-bold text-black mb-2 ${montserrat.className}`}>
              My Blog Posts
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, teachings, and updates from Dr. Joshua Todd
            </p>
            <div className="flex justify-center pt-6">
              <Search onSearch={handleSearch} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post: Post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-xl">
                    {post.imageUrl && (
                      <div className="relative aspect-video rounded-t-xl overflow-hidden">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="line-clamp-2 hover:text-purple-600 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription>
                        {formatDate(post.publishedAt)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 
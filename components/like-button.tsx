'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LikeButtonProps {
  slug: string
  initialLikeCount?: number
}

export function LikeButton({ slug, initialLikeCount = 0 }: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user has already liked this post (using localStorage)
    const hasLiked = localStorage.getItem(`liked-post-${slug}`)
    setIsLiked(!!hasLiked)
  }, [slug])

  const handleLike = async () => {
    if (isLoading) return
    
    // Prevent multiple likes from the same user
    if (isLiked) return

    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/blog/${slug}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setLikeCount(data.likeCount)
        setIsLiked(true)
        localStorage.setItem(`liked-post-${slug}`, 'true')
      }
    } catch (error) {
      console.error('Error liking post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center mt-8">
      <Button
        onClick={handleLike}
        disabled={isLoading || isLiked}
        className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
          isLiked 
            ? 'bg-red-500 text-white hover:bg-red-600' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        }`}
        variant="ghost"
      >
        <Heart 
          className={`w-5 h-5 transition-colors ${
            isLiked ? 'fill-white text-white' : 'text-gray-700 dark:text-gray-300'
          }`}
        />
        <span className="font-medium">
          {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
        </span>
      </Button>
    </div>
  )
} 
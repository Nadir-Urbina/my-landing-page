'use client'

import { useState, useEffect } from 'react'
import { formatDate } from '@/lib/utils'

interface CommentData {
  _id: string
  author: string
  content: string
  submittedAt: string
  approvedAt?: string
}

interface CommentListProps {
  slug: string
  refreshTrigger?: number
}

export function CommentList({ slug, refreshTrigger = 0 }: CommentListProps) {
  const [comments, setComments] = useState<CommentData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchComments = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/blog/${slug}/comments`)
      const data = await response.json()

      if (response.ok) {
        setComments(data.comments || [])
      } else {
        setError(data.error || 'Failed to load comments')
      }
    } catch (err) {
      setError('Failed to load comments')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [slug, refreshTrigger])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        {error}
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No comments yet. Be the first to share your thoughts!
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Comments ({comments.length})
      </h3>
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <div 
            key={comment._id} 
            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                {comment.author}
              </h4>
              <time className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(comment.submittedAt)}
              </time>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
} 
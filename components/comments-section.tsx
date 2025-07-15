'use client'

import { useState } from 'react'
import { CommentForm } from './comment-form'
import { CommentList } from './comment-list'

interface CommentsSectionProps {
  slug: string
}

export function CommentsSection({ slug }: CommentsSectionProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleCommentSubmitted = () => {
    // Trigger a refresh of the comment list
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="mt-12 space-y-8">
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Join the Conversation
        </h2>
        
        {/* Comment Form */}
        <div className="mb-12">
          <CommentForm 
            slug={slug} 
            onCommentSubmitted={handleCommentSubmitted}
          />
        </div>
        
        {/* Comment List */}
        <CommentList 
          slug={slug} 
          refreshTrigger={refreshTrigger}
        />
      </div>
    </div>
  )
} 
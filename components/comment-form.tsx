'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface CommentFormProps {
  slug: string
  onCommentSubmitted?: () => void
}

export function CommentForm({ slug, onCommentSubmitted }: CommentFormProps) {
  const [formData, setFormData] = useState({
    author: '',
    email: '',
    content: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/blog/${slug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ author: '', email: '', content: '' })
        onCommentSubmitted?.()
      } else {
        setError(data.error || 'Failed to submit comment')
      }
    } catch (err) {
      setError('Failed to submit comment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Comment Submitted!</h3>
        <p className="text-green-700">
          Thank you for your comment. It will be reviewed and published once approved.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="outline"
          className="mt-4"
        >
          Submit Another Comment
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name *
          </label>
          <Input
            id="author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">Your email will not be published</p>
        </div>
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Comment *
        </label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          placeholder="Share your thoughts..."
          rows={4}
          className="w-full"
          maxLength={1000}
        />
        <p className="text-xs text-gray-500 mt-1">
          {formData.content.length}/1000 characters
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Comment'}
      </Button>
      
      <p className="text-xs text-gray-500">
        Comments are moderated and will be published once approved.
      </p>
    </form>
  )
} 
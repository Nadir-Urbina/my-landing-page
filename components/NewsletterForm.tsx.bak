'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Something went wrong!')

      setStatus('success')
      setMessage('Thanks for subscribing!')
      setEmail('')
    } catch (error: any) {
      setStatus('error')
      setMessage(error.message)
    }
  }

  return (
    <form onSubmit={subscribe} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
          disabled={status === 'loading'}
        />
        <Button 
          type="submit"
          disabled={status === 'loading'}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
      {message && (
        <p className={`mt-2 text-sm ${
          status === 'error' ? 'text-red-500' : 'text-green-500'
        }`}>
          {message}
        </p>
      )}
    </form>
  )
} 
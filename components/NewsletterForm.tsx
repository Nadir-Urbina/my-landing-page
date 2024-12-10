'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronRight } from 'lucide-react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) throw new Error()

      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full sm:w-[300px] bg-white/10"
        required
      />
      <Button 
        type="submit"
        size="lg" 
        className="w-full sm:w-auto bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white border-0"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe to Newsletter'}
        <ChevronRight className="ml-2" />
      </Button>
      {status === 'success' && (
        <p className="mt-4 text-green-600">Thank you for subscribing!</p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  )
} 
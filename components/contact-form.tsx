'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const { executeRecaptcha } = useGoogleReCaptcha()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    if (!executeRecaptcha) {
      setError('reCAPTCHA not loaded yet. Please try again.')
      setIsSubmitting(false)
      return
    }

    try {
      // Get reCAPTCHA token
      const token = await executeRecaptcha('contact_form')

      const formData = new FormData(e.currentTarget)
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        recaptchaToken: token,
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitted(true)
        e.currentTarget.reset()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
        />
      </div>
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
        />
      </div>
      <div>
        <Textarea
          name="message"
          placeholder="Your Message"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[120px]"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-black hover:bg-white/90"
      >
        {isSubmitting ? (
          'Sending...'
        ) : (
          <span className="flex items-center gap-2">
            Send Message
            <Send className="w-4 h-4" />
          </span>
        )}
      </Button>
      {submitted && (
        <p className="text-green-400 text-sm">Message sent successfully!</p>
      )}
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </form>
  )
} 
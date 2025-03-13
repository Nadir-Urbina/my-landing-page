'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export function InterestForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'info'>('idle')
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/school-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Something went wrong!')

      setStatus(data.type || 'success')
      setMessage(data.message)
      
      if (data.success) {
        setFormData({
          name: '',
          email: '',
          phone: ''
        })
      }
    } catch (error: any) {
      setStatus('error')
      setMessage(error.message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full mx-auto"
    >
      <h3 className="text-2xl font-bold mb-6 text-center">Keep Me Informed</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
            disabled={status === 'loading'}
          />
        </div>
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
            disabled={status === 'loading'}
          />
        </div>
        <div>
          <Input
            type="tel"
            name="phone"
            placeholder="Phone Number (Optional)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full"
            disabled={status === 'loading'}
          />
        </div>
        <Button 
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2 rounded-md transition-all duration-300"
        >
          {status === 'loading' ? 'Submitting...' : 'Stay Updated'}
        </Button>
      </form>
      {message && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-4 text-sm text-center ${
            status === 'error' ? 'text-red-500' : 
            status === 'info' ? 'text-blue-500' : 'text-green-500'
          }`}
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  )
} 
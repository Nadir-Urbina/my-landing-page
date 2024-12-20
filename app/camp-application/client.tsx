'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export function CampApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    ministry: '',
    kingdomLeader: '',
    propheticTraining: '',
    salvationExperience: '',
    viewOfGod: '',
    hopesToLearn: '',
    howHeardAboutCamp: '',
    knowSomeoneInCamp: '',
    potentialCandidates: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/camp-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit application')
      }

      setSubmitStatus({
        type: 'success',
        message: 'Application submitted successfully! We will be in touch soon.',
      })
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        ministry: '',
        kingdomLeader: '',
        propheticTraining: '',
        salvationExperience: '',
        viewOfGod: '',
        hopesToLearn: '',
        howHeardAboutCamp: '',
        knowSomeoneInCamp: '',
        potentialCandidates: ''
      })
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'There was an error submitting your application. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <main className="min-h-screen py-16 bg-gray-50">
      <div className="container max-w-3xl">
        <Card className="p-8">
          <h1 className={`text-3xl font-bold mb-8 ${montserrat.className}`}>
            CAMP 2025 Application
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className={`text-xl font-semibold ${montserrat.className}`}>Personal Information</h2>
              
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Active Phone Number *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Ministry Information */}
            <div className="space-y-4">
              <h2 className={`text-xl font-semibold ${montserrat.className}`}>Current Ministry Involvement</h2>
              
              <div>
                <label htmlFor="ministry" className="block text-sm font-medium mb-2">
                  What ministry are you currently connected to? *
                </label>
                <Textarea
                  id="ministry"
                  name="ministry"
                  value={formData.ministry}
                  onChange={handleChange}
                  placeholder="Please provide the name, website, and geographical information"
                  required
                />
              </div>

              <div>
                <label htmlFor="kingdomLeader" className="block text-sm font-medium mb-2">
                  Who is your current kingdom leader? *
                </label>
                <Textarea
                  id="kingdomLeader"
                  name="kingdomLeader"
                  value={formData.kingdomLeader}
                  onChange={handleChange}
                  placeholder="Please provide their name and all contact details for reference"
                  required
                />
              </div>

              <div>
                <label htmlFor="propheticTraining" className="block text-sm font-medium mb-2">
                  Please thoroughly describe your level of prophetic training and involvement to date *
                </label>
                <Textarea
                  id="propheticTraining"
                  name="propheticTraining"
                  value={formData.propheticTraining}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Spiritual Background */}
            <div className="space-y-4">
              <h2 className={`text-xl font-semibold ${montserrat.className}`}>Spiritual Background</h2>
              
              <div>
                <label htmlFor="salvationExperience" className="block text-sm font-medium mb-2">
                  Describe your salvation experience *
                </label>
                <Textarea
                  id="salvationExperience"
                  name="salvationExperience"
                  value={formData.salvationExperience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="viewOfGod" className="block text-sm font-medium mb-2">
                  Describe your view of God the Father, Jesus, and the Holy Spirit *
                </label>
                <Textarea
                  id="viewOfGod"
                  name="viewOfGod"
                  value={formData.viewOfGod}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* CAMP Specific Questions */}
            <div className="space-y-4">
              <h2 className={`text-xl font-semibold ${montserrat.className}`}>CAMP Specific Questions</h2>
              
              <div>
                <label htmlFor="hopesToLearn" className="block text-sm font-medium mb-2">
                  What do you hope to learn in CAMP 2025? *
                </label>
                <Textarea
                  id="hopesToLearn"
                  name="hopesToLearn"
                  value={formData.hopesToLearn}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="howHeardAboutCamp" className="block text-sm font-medium mb-2">
                  How did you hear about CAMP? *
                </label>
                <Input
                  id="howHeardAboutCamp"
                  name="howHeardAboutCamp"
                  value={formData.howHeardAboutCamp}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="knowSomeoneInCamp" className="block text-sm font-medium mb-2">
                  Do you know someone else in CAMP 2025?
                </label>
                <Input
                  id="knowSomeoneInCamp"
                  name="knowSomeoneInCamp"
                  value={formData.knowSomeoneInCamp}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="potentialCandidates" className="block text-sm font-medium mb-2">
                  Can you think of someone who might benefit from being involved in CAMP?
                </label>
                <Textarea
                  id="potentialCandidates"
                  name="potentialCandidates"
                  value={formData.potentialCandidates}
                  onChange={handleChange}
                  placeholder="Please provide their name and email address"
                />
              </div>
            </div>

            {submitStatus.type && (
              <div
                className={`p-4 rounded-md ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 text-green-800' 
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  )
} 
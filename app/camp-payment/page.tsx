'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PriceOption {
  id: string
  amount: number
  description: string
}

function CampPaymentContent() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState<string>('')
  const [applicationData, setApplicationData] = useState<any>(null)
  
  const applicationId = searchParams.get('applicationId')
  const email = searchParams.get('email')
  const name = searchParams.get('name')

  const priceOptions: PriceOption[] = [
    {
      id: process.env.NEXT_PUBLIC_CAMP_PRICE_100 || '',
      amount: 100,
      description: 'Standard Monthly Commitment - $100/month'
    },
    {
      id: process.env.NEXT_PUBLIC_CAMP_PRICE_150 || '',
      amount: 150,
      description: 'Supporter Level - $150/month (Helps sponsor others)'
    },
    {
      id: process.env.NEXT_PUBLIC_CAMP_PRICE_200 || '',
      amount: 200,
      description: 'Champion Level - $200/month (Maximum impact)'
    }
  ]

  useEffect(() => {
    // Set default selection to $100
    if (priceOptions[0]?.id) {
      setSelectedPrice(priceOptions[0].id)
    }
  }, [])

  const handlePayment = async () => {
    if (!selectedPrice || !applicationId || !email || !name) {
      alert('Missing required information. Please ensure you came from a valid application.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/camp-payment/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: selectedPrice,
          customerEmail: email,
          customerName: name,
          applicationId: applicationId
        }),
      })

      const { sessionId, url } = await response.json()

      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('There was an error processing your payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!applicationId || !email || !name) {
    return (
      <div className="container max-w-2xl py-16">
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Invalid Payment Link</h1>
            <p className="text-gray-600">
              This payment page requires valid application information. Please ensure you accessed this page from your application confirmation email.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl py-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Complete Your CAMP Season 3 Registration</CardTitle>
          <p className="text-gray-600 text-center">
            Welcome {name}! Please select your monthly commitment level to activate your CAMP membership.
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Application Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Your Application</h3>
              <p className="text-blue-800 text-sm">
                <strong>Name:</strong> {name}<br />
                <strong>Email:</strong> {email}<br />
                <strong>Application ID:</strong> {applicationId.slice(-8)}
              </p>
            </div>

            {/* Price Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Your Monthly Commitment</h3>
              <div className="space-y-3">
                {priceOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPrice === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="priceOption"
                      value={option.id}
                      checked={selectedPrice === option.id}
                      onChange={(e) => setSelectedPrice(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">${option.amount}/month</div>
                        <div className="text-sm text-gray-600">{option.description}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedPrice === option.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedPrice === option.id && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-2">Important Notes:</h4>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• This creates a monthly recurring subscription</li>
                <li>• You can cancel anytime from your account dashboard</li>
                <li>• Your first payment will be processed immediately</li>
                <li>• Subsequent payments will occur monthly on the same date</li>
                <li>• You'll receive email confirmations for all transactions</li>
              </ul>
            </div>

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              disabled={loading || !selectedPrice}
              className="w-full py-3 text-lg"
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Processing...
                </>
              ) : (
                `Continue to Payment ($${priceOptions.find(p => p.id === selectedPrice)?.amount}/month)`
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Secure payment processing by Stripe. Your card information is never stored on our servers.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function CampPaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment options...</p>
        </div>
      </div>
    }>
      <CampPaymentContent />
    </Suspense>
  )
}
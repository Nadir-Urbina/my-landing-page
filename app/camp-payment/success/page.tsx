'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [sessionData, setSessionData] = useState<any>(null)

  useEffect(() => {
    if (sessionId) {
      // You could fetch session details here if needed
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="container max-w-2xl py-16">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl py-16">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Welcome to CAMP 2025!</h2>
            <p className="text-gray-600">
              Congratulations! Your payment has been processed successfully and your CAMP 2025 subscription is now active.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg text-left">
            <h3 className="font-semibold text-blue-900 mb-3">What happens next?</h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">📧</span>
                You'll receive a confirmation email with your subscription details
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">📅</span>
                Dr. Joshua will contact you with the schedule and access information
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">💳</span>
                Your subscription will automatically renew monthly on this date
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">📱</span>
                You can manage your subscription anytime from your account
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-semibold text-amber-900 mb-2">Important Information:</h4>
            <p className="text-amber-800 text-sm">
              Save this confirmation page. Your session ID is: <code className="bg-amber-100 px-1 rounded">{sessionId}</code>
            </p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">Return to Homepage</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/camp">Learn More About CAMP</Link>
            </Button>
          </div>

          <p className="text-xs text-gray-500">
            If you have any questions, please contact us at drjoshuatodd@eastgatejax.com
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="container max-w-2xl py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment confirmation...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}
'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function PaymentCancelledPage() {
  return (
    <div className="container max-w-2xl py-16">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <CardTitle className="text-2xl text-orange-600">Payment Cancelled</CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-4">
            <p className="text-gray-600">
              Your payment was cancelled and no charges were made to your card.
            </p>
            <p className="text-gray-600">
              Your CAMP 2025 application is still pending. You can complete the payment process at any time to activate your membership.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg text-left">
            <h3 className="font-semibold text-blue-900 mb-3">Need help or have questions?</h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">💬</span>
                Contact our team if you're experiencing payment issues
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">💰</span>
                If the amount is a concern, reach out to discuss assistance options
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">⏰</span>
                You can retry payment anytime - your application remains active
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="javascript:history.back()">Try Payment Again</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/camp">Back to CAMP Information</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Need assistance?</p>
            <p className="text-sm">
              Email: <a href="mailto:drjoshuatodd@eastgatejax.com" className="text-blue-600 hover:underline">drjoshuatodd@eastgatejax.com</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
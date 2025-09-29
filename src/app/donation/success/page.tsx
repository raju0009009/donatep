"use client"

import React from "react"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function DonationSuccessPage() {
  const [searchParams, setSearchParams] = React.useState(new URLSearchParams())

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setSearchParams(params)
    }
  }, [])

  const orderId = searchParams.get('order_id')

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Thank You!</CardTitle>
          <p className="text-gray-600">
            Your donation has been received successfully
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {orderId && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-mono text-sm font-medium">{orderId}</p>
            </div>
          )}

          <div className="text-center space-y-2">
            <p className="text-gray-700">
              Your generous contribution will help us make a difference in the lives of those affected by the floods in Punjab.
            </p>
            <p className="text-sm text-gray-500">
              A confirmation email will be sent to you shortly.
            </p>
          </div>

          <div className="space-y-2">
            <Link href="/" className="w-full">
              <Button className="w-full" variant="default">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Home
              </Button>
            </Link>

            <Button
              className="w-full"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Make Another Donation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
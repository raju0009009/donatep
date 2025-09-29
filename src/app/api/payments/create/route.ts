import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, phone, fullName, email, address, tipPercentage } = body

    // Validate required fields
    if (!amount || !phone || !fullName || !email) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate unique order ID
    const orderId = `DON-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Prepare KukuPay payload
    const kukupayPayload = {
      api_key: process.env.KUKUPAY_API_KEY,
      amount: amount,
      phone: phone,
      webhook_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payments/webhook`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/donation/success?order_id=${orderId}`,
      order_id: orderId,
      customer_name: fullName,
      customer_email: email,
      customer_address: address || '',
      notes: `Donation with ${tipPercentage}% tip`
    }

    // Make request to KukuPay API
    const response = await fetch(process.env.KUKUPAY_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(kukupayPayload),
    })

    const data = await response.json()

    if (data.status === 200 && data.data?.payment_url) {
      // Return payment URL for redirect
      return NextResponse.json({
        success: true,
        paymentUrl: data.data.payment_url,
        orderId: data.data.client_txn_id || orderId
      })
    } else {
      console.error('KukuPay API error:', data)
      return NextResponse.json(
        { success: false, error: 'Failed to create payment' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}